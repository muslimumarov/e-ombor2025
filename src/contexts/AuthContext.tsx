import React, { createContext, useEffect, useState } from "react";
import { useAuthStore } from "../store/authStore";
import FullScreenSpinner from "../components/loader/FullScreenSpinner";
import { AuthContextType } from "./authInterfaces";

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const isAuthed = useAuthStore((s) => s.isAuthed);
    const user = useAuthStore((s) => s.user);
    const login = useAuthStore((s) => s.login);
    const logout = useAuthStore((s) => s.logout);
    const bootstrap = useAuthStore((s) => s.bootstrap);

    const [loading, setLoading] = useState(true);

    const initAuth = async () => {
        console.log("[AuthProvider] initAuth start");
        try {
            await bootstrap();
            console.log("[AuthProvider] bootstrap success ✅");
        } catch (e) {
            console.error("[AuthProvider] bootstrap xatosi:", e);
            await logout();
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        initAuth();
    }, [bootstrap, logout]);

    if (loading) return <FullScreenSpinner />;

    return (
        <AuthContext.Provider value={{ isAuthed, user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
