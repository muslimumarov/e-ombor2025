// src/components/ProtectedRoute.tsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { UserRole } from "../store/authStore";

interface ProtectedRouteProps {
    role?: UserRole; // ixtiyoriy: agar role so'ralsa, role tekshiramiz
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ role }) => {
    const { isAuthed, user } = useAuth();

    if (!isAuthed) return <Navigate to="/login" replace />;

    if (role && user?.role !== role) {
        // role mos kelmasa: o'z roliga yo'naltiramiz
        return <Navigate to={`/${user?.role ?? "dashboard"}`} replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
