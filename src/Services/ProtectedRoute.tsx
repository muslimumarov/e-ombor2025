import React, { ReactNode } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { UserRole } from "../store/authStore";
import FullScreenSpinner from "../components/loader/FullScreenSpinner.tsx";
import {routeByRole} from "../utils/routeByRole.ts";

interface ProtectedRouteProps {
    role?: UserRole;
    children?: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ role, children }) => {
    const { isAuthed, user, loading } = useAuth();

    if (loading) return <FullScreenSpinner />;
    if (!isAuthed) return <Navigate to="/login" replace />;

    if (role && user?.role !== role) {
        console.log("Redirecting user with role:", user?.role);
        return <Navigate to={routeByRole(user!.role)} replace />;
    }

    return <>{children || <Outlet />}</>;
};

export default ProtectedRoute;
