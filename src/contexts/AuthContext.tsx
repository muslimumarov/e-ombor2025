// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuthStore, MeResponse } from "../store/authStore";
import FullScreenSpinner from "../components/loader/FullScreenSpinner.tsx";

interface AuthContextType {
    isAuthed: boolean;
    user: MeResponse | null;
    loading: boolean;
    login: (u: string, p: string) => Promise<MeResponse>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const isAuthed = useAuthStore((s) => s.isAuthed);
    const user = useAuthStore((s) => s.user);
    const login = useAuthStore((s) => s.login);
    const logout = useAuthStore((s) => s.logout);
    const bootstrap = useAuthStore((s) => s.bootstrap);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                await bootstrap(); // tokenni refresh qilish va userni olish
            } catch (e) {
                console.error("Bootstrap xatosi:", e);
                // refresh token ishlamasa AuthStore-ni tozalaymiz
                useAuthStore.getState().setAccess(null);
                useAuthStore.getState().setUser(null);
            } finally {
                setLoading(false); // ✅ har doim loading false
            }
        })();
    }, [bootstrap]);

    if (loading) return <FullScreenSpinner />;

    return (
        <AuthContext.Provider value={{ isAuthed, user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
}
