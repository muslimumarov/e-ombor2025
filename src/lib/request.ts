// src/lib/request.ts
import {LoginResponse, ProfileResponse} from "../utils/interfaces/interfaces.ts";
import api from "./api.ts";
import Cookies from "js-cookie";
import {useAuthStore} from "../store/authStore.ts";
import axios from "axios";

export async function getProfile(): Promise<ProfileResponse> {
    const {data} = await api.get<ProfileResponse>("/profile/");
    return data;
}

// interface RefreshResponse {
//     access: string;
// }

export async function loginRequest(username: string, password: string): Promise<LoginResponse> {

    const {data} = await api.post<LoginResponse>("/token/", {username, password});

    if (data.access) {
        Cookies.set("access_token", data.access, {
            expires: 1, // 1 kun
            secure: true,
            sameSite: "Lax",
        });
    }
    if (data.refresh) {
        Cookies.set("refresh_token", data.refresh, {
            expires: 7, // 7 kun
            secure: true,
            sameSite: "Lax",
        });
    }
    return data;
}

export async function refreshAccessToken(): Promise<string | null> {
    const refreshToken = Cookies.get("refresh_token");
    if (!refreshToken) return null;

    try {
        const { data } = await axios.post(`${import.meta.env.VITE_API_BASE}/token/refresh/`, {
            refresh: refreshToken,
        }, { withCredentials: true });

        Cookies.set("access_token", data.access, {
            expires: 1,
            secure: true,
            sameSite: "Lax",
        });

        return data.access;
    } catch (err) {
        console.error("[Auth] ❌ Refresh ham ishlamadi:", err);
        return null;
    }
}

export async function logoutRequest(): Promise<void> {
    try {
        // serverga POST yuborilmaydi (agar backendda chiqish endpointi bo‘lsa, shu yerda chaqirasiz)
    } finally {
        Cookies.remove("access_token");
        Cookies.remove("refresh_token");
        useAuthStore.getState().setAccess(null);
        useAuthStore.getState().setUser(null);
    }
}

export async function safeRedirectToLogin() {
    const { logout } = useAuthStore.getState();
    try {
        await logout();
    } catch (e) {
        console.error("Logout xatosi:", e);
    }

    // ✅ Login sahifasiga yo‘naltirish, history tozalanadi
    if (window.location.pathname !== "/login") {
        window.location.replace("/login");
    }
}