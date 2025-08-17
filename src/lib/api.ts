// src/lib/api.ts
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import {MeResponse, useAuthStore, UserRole} from "../store/authStore";

const api: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE,
    withCredentials: false,
});

let isRefreshing = false;
let queue: Array<(token: string | null) => void> = [];

const flushQueue = (token: string | null) => {
    queue.forEach((resolve) => resolve(token));
    queue = [];
};

// Request interceptor
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("access_token");
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
        const status = error.response?.status;
        const original = error.config as (AxiosRequestConfig & { _retry?: boolean }) | undefined;

        if (status === 401 && original && !original._retry) {
            original._retry = true;

            if (isRefreshing) {
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
                useAuthStore.getState().setAccess(newAccess);
                flushQueue(newAccess);

                if (newAccess) {
                    original.headers = original.headers ?? {};
                    (original.headers as Record<string, string>).Authorization = `Bearer ${newAccess}`;
                }
                return api(original);
            } catch (e) {
                flushQueue(null);
                await safeRedirectToLogin();
                return Promise.reject(e);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

// Auth API
export interface LoginResponse { access: string; refresh: string; }

export async function loginRequest(username: string, password: string): Promise<LoginResponse> {
    const { data } = await api.post<LoginResponse>("/token/", { username, password });
    localStorage.setItem("access_token", data.access);
    localStorage.setItem("refresh_token", data.refresh);
    return data;
}

export async function refreshAccessToken(): Promise<string | null> {
    try {
        const refresh = localStorage.getItem("refresh_token");
        if (!refresh) return null;

        const { data } = await api.post<{ access: string }>("/token/refresh/", { refresh });
        if (data.access) {
            localStorage.setItem("access_token", data.access);
            return data.access;
        }
        return null;
    } catch {
        return null;
    }
}

export async function logoutRequest(): Promise<void> {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
}

async function safeRedirectToLogin() {
    const { logout } = useAuthStore.getState();
    try { await logout(); } catch {}
    window.location.replace("/login");
}

// Profile API
export interface ProfileResponse {
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    role: string | null;
    image_url: string | null;
}

export async function getProfile(): Promise<ProfileResponse> {
    const res = await api.get("/profile/");
    console.log("📡 getProfile raw response:", res);
    console.log("📄 getProfile raw data:", res.data);
    return res.data;
}

// api.ts ichida
export async function getMe(): Promise<MeResponse> {
    const { data } = await api.get<{ id: number; username: string; role: string }>("/me/");
    return {
        id: data.id,
        username: data.username,
        role: data.role as UserRole, // <--- shu yerda cast qilyapmiz
    };
}


export default api;
