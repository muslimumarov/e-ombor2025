// ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import {UserRole} from "../utils/interfaces/interfaces.ts";
import {useAuth} from "../contexts/authComponent.ts";
import FullScreenSpinner from "../components/loader/FullScreenSpinner.tsx";

interface ProtectedRouteProps {
    children: React.ReactNode;
    roles?: UserRole[];
}

export default function ProtectedRoute({ children, roles }: ProtectedRouteProps) {
    const { user, loading } = useAuth();
    console.log("Protected user:", user)
    if (loading) return <FullScreenSpinner/>

    // user yo‘q bo‘lsa -> login sahifasiga otkazamiz
    if (!user) {
        return <Navigate to="/login" replace />;
    }
    if (roles && user.role && !roles.includes(user.role)) {
        return <div>No access</div>; // yoki <Navigate to="/403" />
    }


    return <>{children}</>;
}
