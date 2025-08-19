// src/lib/api.ts
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import Cookies from "js-cookie";
import { useAuthStore, UserRole } from "../store/authStore";

const api: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE,
    withCredentials: true,
});

// Queue va refresh holati
let isRefreshing = false;
let queue: Array<(token: string | null) => void> = [];

const flushQueue = (token: string | null) => {
    queue.forEach((resolve) => resolve(token));
    queue = [];
};

// Request interceptor
api.interceptors.request.use((config) => {
    const token = Cookies.get("access_token");
    if (token) {
        config.headers = config.headers ?? {};
        (config.headers as Record<string, string>).Authorization = `Bearer ${token}`;
    }
    return config;
});

// Response interceptor
api.interceptors.response.use(
    (res) => res,
    async (error: AxiosError) => {
        const original = error.config as AxiosRequestConfig & { _retry?: boolean };

        if (error.response?.status === 401 && !original._retry) {
            original._retry = true;

            const refresh = Cookies.get("refresh_token");
            if (refresh) {
                if (isRefreshing) {
                    // Agar boshqa request tokenni yangilamoqda bo'lsa, queuega qo'shish
                    const newToken = await new Promise<string | null>((resolve) => queue.push(resolve));
                    if (newToken) {
                        original.headers = original.headers ?? {};
                        (original.headers as Record<string, string>).Authorization = `Bearer ${newToken}`;
                    }
                    return api(original);
                }

                isRefreshing = true;
                try {
                    const newAccess = await refreshAccessToken();
                    if (!newAccess) throw new Error("Refresh token eskirgan");

                    useAuthStore.getState().setAccess(newAccess);
                    flushQueue(newAccess);

                    original.headers = original.headers ?? {};
                    (original.headers as Record<string, string>).Authorization = `Bearer ${newAccess}`;

                    return api(original); // 🔄 requestni qayta yuboradi, foydalanuvchi sahifada qoladi
                } catch {
                    flushQueue(null);
                    await safeRedirectToLogin(); // agar refresh token ishlamasa loginga yo'naltirish
                    return Promise.reject(error);
                } finally {
                    isRefreshing = false;
                }
            } else {
                await safeRedirectToLogin(); // refresh token yo'q bo'lsa loginga yo'naltirish
            }
        }

        return Promise.reject(error);
    }
);

// Auth API
export interface LoginResponse {
    access: string;
    refresh?: string;
}

export async function loginRequest(username: string, password: string): Promise<LoginResponse> {
    const { data } = await api.post<LoginResponse>("/token/", { username, password });
    if (data.access) {
        Cookies.set("access_token", data.access, { expires: 1, secure: false, sameSite: "Lax" });
    }
    if (data.refresh) {
        Cookies.set("refresh_token", data.refresh, { expires: 7, secure: false, sameSite: "Lax" });
    }
    return data;
}

export async function refreshAccessToken(): Promise<string | null> {
    try {
        const refresh = Cookies.get("refresh_token");
        if (!refresh) return null;

        const { data } = await api.post<{ access: string }>("/token/refresh/", { refresh });
        if (data.access) {
            Cookies.set("access_token", data.access, { expires: 1, secure: true, sameSite: "Strict" });
        }
        return data.access ?? null;
    } catch {
        return null;
    }
}

export async function logoutRequest(): Promise<void> {
    try {
        // serverga POST yuborish shart emas
    } finally {
        Cookies.remove("access_token");
        Cookies.remove("refresh_token");
        useAuthStore.getState().setAccess(null);
        useAuthStore.getState().setUser(null);
    }
}

// Login sahifasiga yo'naltirish
export async function safeRedirectToLogin() {
    const { logout } = useAuthStore.getState();
    try {
        await logout();
    } catch (e) {
        console.error("Logout xatosi:", e);
    }
    window.location.replace("/login");
}

// Profile API
export interface ProfileResponse {
    id: number;
    username: string;
    role: UserRole;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    image_url: string | null;
}
export async function getProfile(): Promise<ProfileResponse> {
    const { data } = await api.get<ProfileResponse>("/profile/");
    return data;
}

export default api;
