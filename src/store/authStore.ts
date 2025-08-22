import {create} from "zustand";
import {devtools} from "zustand/middleware";
import Cookies from "js-cookie";
import {AuthState} from "./storeInterfaces.ts";
import {LoginResponse} from "../utils/interfaces/interfaces.ts";
import {getProfile, loginRequest, logoutRequest, refreshAccessToken} from "../lib/request.ts";


export const useAuthStore = create<AuthState>()(
    devtools((set, get) => ({
        user: null,
        accessToken: Cookies.get("access_token") || null,
        isAuthed: !!Cookies.get("access_token"),
        loading: false,

        setAccess: (token) =>
            set((state) => {
                if (state.accessToken === token) return state; // ⚡️ o‘zgarmasa render qilma
                return {accessToken: token, isAuthed: !!token};
            }),

        setUser: (user) =>
            set((state) => {
                if (JSON.stringify(state.user) === JSON.stringify(user)) return state; // ⚡️ faqat yangilansa yoz
                return {user};
            }),

        login: async (username, password) => {
            set({loading: true});
            try {
                const data: LoginResponse = await loginRequest(username, password);
                if (!data.access) throw new Error("Access token yo‘q");

                set((state) =>
                    state.accessToken === data.access
                        ? state
                        : {accessToken: data.access, isAuthed: true}
                );

                const profile = await getProfile();
                set((state) =>
                    JSON.stringify(state.user) === JSON.stringify(profile)
                        ? state
                        : {user: profile}
                );
                return profile;
            } finally {
                set({loading: false});
            }
        },

        logout: async () => {
            set({loading: true});
            try {
                await logoutRequest();
            } finally {
                Cookies.remove("access_token");
                Cookies.remove("refresh_token");
                set((state) =>
                    !state.user && !state.accessToken && !state.isAuthed
                        ? state
                        : {user: null, accessToken: null, isAuthed: false, loading: false}
                );
            }
        },

        loadProfile: async () => {
            try {
                const profile = await getProfile();
                set((state) =>
                    JSON.stringify(state.user) === JSON.stringify(profile)
                        ? state
                        : {user: profile}
                );
            } catch {
                set((state) => (state.user === null ? state : {user: null}));
            }
        },
        refresh: async () => {
            try {
                const newToken = await refreshAccessToken();

                if (newToken) {
                    Cookies.set("access_token", newToken, {
                        expires: 1,
                        secure: true,
                        sameSite: "Lax",
                    });

                    set((state) =>
                        state.accessToken === newToken
                            ? state
                            : { accessToken: newToken, isAuthed: true }
                    );
                } else {
                    throw new Error("Refresh token invalid");
                }
            } catch (err) {
                // ❌ Refresh ham ishlamadi → logout qilamiz
                Cookies.remove("access_token");
                Cookies.remove("refresh_token");
                set(() => ({
                    isAuthed: false,
                    accessToken: null,
                    user: null,
                }));
                throw err; // muhim: bootstrap bilishi uchun tashlaymiz
            }
        },


        bootstrap: async () => {
            const token = Cookies.get("access_token");
            if (!token) {
                await get().refresh();
            }

            if (get().isAuthed) {
                await get().loadProfile();
            }
        },
    }))
);
