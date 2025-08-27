// src/lib/api.ts
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import Cookies from "js-cookie";
import { useAuthStore } from "../store/authStore";
import {refreshAccessToken, safeRedirectToLogin} from "./request.ts";

const api: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE,
    withCredentials: true,
});

let isRefreshing = false;
let queue: Array<(token: string | null) => void> = [];

const flushQueue = (token: string | null) => {
    queue.forEach((resolve) => resolve(token));
    queue = [];
};

// 🟢 Request interceptor → token qo‘shib yuboramiz
api.interceptors.request.use((config) => {
    const token = Cookies.get("access_token");
    if (token) {
        config.headers = config.headers ?? {};
        (config.headers as Record<string, string>).Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (res) => res,
    async (error: AxiosError) => {
        const original = error.config as AxiosRequestConfig & { _retry?: boolean };

        if (window.location.pathname === "/login" || original._retry) {
            return Promise.reject(error);
        }

        if (error.response?.status === 401) {
            original._retry = true;
            // console.warn("[401] Access token eskirgan, refresh qilinmoqda...");

            const refresh = Cookies.get("refresh_token");
            console.log("bu refresh: ", refresh);
            if (!refresh) {
                // ❌ Refresh token yo‘q → tozalash
                safeRedirectToLogin()
                await forceLogout();
                window.location.href = "/login";

                return Promise.reject(error);
            }

            if (isRefreshing) {
                // boshqa requestlar kutadi
                const newToken = await new Promise<string | null>((resolve) => queue.push(resolve));
                if (newToken) {
                    original.headers = original.headers ?? {};
                    (original.headers as Record<string, string>).Authorization = `Bearer ${newToken}`;
                    return api(original);
                }
                return Promise.reject(error);
            }

            isRefreshing = true;
            try {
                const newAccess = await refreshAccessToken();

                if (!newAccess) throw new Error("Refresh eskirgan");

                Cookies.set("access_token", newAccess, {
                    expires: 1,
                    secure: true,
                    sameSite: "Lax",
                });

                useAuthStore.getState().setAccess(newAccess);
                flushQueue(newAccess);

                original.headers = original.headers ?? {};
                (original.headers as Record<string, string>).Authorization = `Bearer ${newAccess}`;

                return api(original);
            } catch (err) {
                console.error("[401] Refresh ham tugagan. Logout qilinmoqda...");
                flushQueue(null);
                await forceLogout();
                return Promise.reject(error);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

// 🔑 umumiy logout helper
async function forceLogout() {
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
    useAuthStore.getState().logout();
    // 🔁 login sahifaga redirect
    if (window.location.pathname !== "/login") {
        window.location.href = "/login";
    }
}

export default api;
