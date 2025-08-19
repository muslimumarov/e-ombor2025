// // src/store/authStore.ts
// import { create } from "zustand";
// import { devtools } from "zustand/middleware";
// import Cookies from "js-cookie";
// import { refreshAccessToken, loginRequest, logoutRequest, getProfile } from "../lib/api";
//
// export type UserRole = "omborchi" | "bugalter" | "boshliq" | "xarid" | "ishboshqaruvchi";
//
// export interface MeResponse {
//     id: number;
//     username: string;
//     role: UserRole;
// }
//
// interface AuthState {
//     isAuthed: boolean;
//     accessToken: string | null;
//     user: MeResponse | null;
//
//     setAccess: (t: string | null) => void;
//     setUser: (u: MeResponse | null) => void;
//
//     bootstrap: () => Promise<void>;
//     login: (u: string, p: string) => Promise<MeResponse>;
//     logout: () => Promise<void>;
// }
//
// const ACCESS_KEY = "access_token";
// const REFRESH_KEY = "refresh_token";
//
// export const useAuthStore = create<AuthState>()(
//     devtools((set) => ({
//         isAuthed: false,
//         accessToken: null,
//         user: null,
//
//         setAccess: (t) => {
//             set({ accessToken: t, isAuthed: !!t });
//             if (t) {
//                 Cookies.set(ACCESS_KEY, t, { expires: 1, secure: true, sameSite: "Strict" });
//             } else {
//                 Cookies.remove(ACCESS_KEY);
//             }
//         },
//
//         setUser: (u) => set({ user: u }),
//
//         bootstrap: async () => {
//             try {
//                 const cookieAccess = Cookies.get(ACCESS_KEY);
//                 const cookieRefresh = Cookies.get(REFRESH_KEY);
//
//                 let token = cookieAccess ?? null;
//                 if (!token && cookieRefresh) {
//                     token = await refreshAccessToken();
//                 }
//
//                 if (token) {
//                     set({ accessToken: token, isAuthed: true });
//                     Cookies.set(ACCESS_KEY, token, { expires: 1, secure: true, sameSite: "Strict" });
//                     const me = await getProfile();
//                     set({ user: me });
//                 } else {
//                     set({ accessToken: null, isAuthed: false, user: null });
//                     Cookies.remove(ACCESS_KEY);
//                     Cookies.remove(REFRESH_KEY);
//                 }
//             } catch {
//                 set({ accessToken: null, isAuthed: false, user: null });
//                 Cookies.remove(ACCESS_KEY);
//                 Cookies.remove(REFRESH_KEY);
//             }
//         },
//
//         login: async (username: string, password: string) => {
//             const { access, refresh } = await loginRequest(username, password);
//             set({ accessToken: access, isAuthed: true });
//             Cookies.set(ACCESS_KEY, access, { expires: 1, secure: true, sameSite: "Strict" });
//             if (refresh) {
//                 Cookies.set(REFRESH_KEY, refresh, { expires: 7, secure: true, sameSite: "Strict" });
//             }
//             const me = await getProfile();
//             set({ user: me });
//             return me;
//         },
//
//         logout: async () => {
//             try {
//                 await logoutRequest();
//             } finally {
//                 set({ accessToken: null, isAuthed: false, user: null });
//                 Cookies.remove(ACCESS_KEY);
//                 Cookies.remove(REFRESH_KEY);
//             }
//         },
//     }))
// );
