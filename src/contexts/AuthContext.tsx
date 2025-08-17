// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useEffect } from "react";
import { useAuthStore, MeResponse } from "../store/authStore";

interface AuthContextType {
    isAuthed: boolean;
    user: MeResponse | null;
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

    // App ishga tushganda: refresh cookie orqali avtomatik kirish
    useEffect(() => {
        bootstrap();
    }, [bootstrap]);

    return (
        <AuthContext.Provider value={{ isAuthed, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
}
