// src/store/authStore.ts
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { refreshAccessToken, loginRequest, logoutRequest, getMe } from "../lib/api";

export type UserRole =
    | "omborchi"
    | "bugalter"
    | "boshliq"
    | "xarid"
    | "ishboshqaruvchi";

export interface MeResponse {
    id: number;
    username: string;
    role: UserRole;
    // kerak bo'lsa qo'shimcha maydonlar
}

interface AuthState {
    isAuthed: boolean;
    accessToken: string | null; // xotirada saqlanadi (persist qilinmaydi)
    user: MeResponse | null;

    // actions
    setAccess: (t: string | null) => void;
    setUser: (u: MeResponse | null) => void;

    // flows
    bootstrap: () => Promise<void>; // sahifa yangilanganda refresh cookie orqali access olish
    login: (u: string, p: string) => Promise<MeResponse>;
    logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
    devtools((set, ) => ({
        isAuthed: false,
        accessToken: null,
        user: null,

        setAccess: (t) => set({ accessToken: t, isAuthed: !!t }),
        setUser: (u) => set({ user: u }),

        // App yuklanganda: refresh cookie orqali yangi access olib, user ma'lumotini chaqiramiz
        bootstrap: async () => {
            try {
                const newAccess = await refreshAccessToken(); // cookie bilan ishlaydi
                if (newAccess) {
                    set({ accessToken: newAccess, isAuthed: true });
                    const me = await getMe();
                    set({ user: me });
                } else {
                    set({ accessToken: null, isAuthed: false, user: null });
                }
            } catch {
                set({ accessToken: null, isAuthed: false, user: null });
            }
        },

        // Login: server refresh cookie qo‘yadi, access body’da (yoki header’da) keladi
        login: async (username: string, password: string) => {
            const { access } = await loginRequest(username, password);
            set({ accessToken: access, isAuthed: true });
            const me = await getMe();
            set({ user: me });
            return me;
        },

        // Logout: server refresh cookie’ni o‘chiradi
        logout: async () => {
            try {
                await logoutRequest();
            } finally {
                set({ accessToken: null, isAuthed: false, user: null });
            }
        },
    }))
);
