// src/lib/request.ts
import {LoginResponse, ProfileResponse} from "../utils/interfaces/interfaces.ts";
import api from "./api.ts";
import Cookies from "js-cookie";
import {useAuthStore} from "../store/authStore.ts";

export async function getProfile(): Promise<ProfileResponse> {
    console.log("[getProfile] profile olinmoqda...");
    const {data} = await api.get<ProfileResponse>("/profile/");
    return data;
}

interface RefreshResponse {
    access: string;
}

export async function loginRequest(username: string, password: string): Promise<LoginResponse> {

    const {data} = await api.post<LoginResponse>("/token/", {username, password});

    if (data.access) {
        Cookies.set("access_token", data.access, {
            expires: 1, // 1 kun
            secure: true,
            sameSite: "Lax",
        });
        console.log("[loginRequest] access_token cookie saqlandi");
    }
    if (data.refresh) {
        Cookies.set("refresh_token", data.refresh, {
            expires: 7, // 7 kun
            secure: true,
            sameSite: "Lax",
        });
        console.log("[loginRequest] refresh_token cookie saqlandi");
    }
    return data;
}

export async function refreshAccessToken(): Promise<string | null> {
    const refreshToken = Cookies.get("refresh_token"); // ✅ yagona nom
    if (!refreshToken) {
        console.warn("[Auth] Refresh token topilmadi");
        return null;
    }

    try {
        const { data } = await api.post<RefreshResponse>("/token/refresh/", { // ✅ endpoint to‘g‘rilandi
            refresh: refreshToken,
        });

        Cookies.set("access_token", data.access, {
            expires: 1,        // 1 kun (avval cookie-da access ham shunday edi)
            secure: true,
            sameSite: "Lax",
        });
        console.log("[Auth] Yangi access_token cookie saqlandi");
        return data.access;
    } catch (err) {
        console.error("[Auth] Refresh token ishlamadi:", err);

        // 🚪 foydalanuvchini chiqib yuborish
        const { logout } = useAuthStore.getState();
        logout();

        window.location.href = "/login";
        return null;
    }
}

export async function logoutRequest(): Promise<void> {
    console.log("[logoutRequest] chiqish jarayoni...");
    try {
        // serverga POST yuborilmaydi (agar backendda chiqish endpointi bo‘lsa, shu yerda chaqirasiz)
    } finally {
        Cookies.remove("access_token");
        Cookies.remove("refresh_token");
        useAuthStore.getState().setAccess(null);
        useAuthStore.getState().setUser(null);
        console.log("[logoutRequest] cookie va store tozalandi");
    }
}

export async function safeRedirectToLogin() {
    console.log("[safeRedirectToLogin] loginga yo‘naltirilmoqda...");
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