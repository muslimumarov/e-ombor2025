// src/route.tsx
import {Navigate, RouteObject, useRoutes} from "react-router-dom";
import BaseLayout from "./layouts/base/BaseLayout";
import Boshliq from "./pages/nazorat/Boshliq";
import Bugalter from "./pages/bugalteriya/Bugalteriya";
import Xarid from "./pages/xarid/Xarid";
import Ishboshqaruvchi from "./pages/ishboshqaruvchi/Ishboshqaruvchi";
import Login from "./layouts/login/Login";
import Omborchi from "./pages/Omborchi/Omborchi";
import ProtectedRoute from "./Services/ProtectedRoute.tsx";
import NotFound from "./NotFound.tsx";

function Rout() {
    const routes: RouteObject[] = [
        { path: "/login", element: <Login /> },
        {
            path: "/",
            element: (
                <ProtectedRoute>
                    <BaseLayout />
                </ProtectedRoute>
            ),
            children: [
                { path: "boshliq", element: <Boshliq /> },
                {
                    path: "bugalter",
                    element: (
                        <ProtectedRoute roles={["bugalter"]}>
                            <Bugalter />
                        </ProtectedRoute>
                    ),
                },
                {
                    path: "omborchi",
                    element: (
                        <ProtectedRoute roles={["omborchi"]}>
                            <Omborchi />
                        </ProtectedRoute>
                    ),
                },
                {
                    path: "xarid",
                    element: (
                        <ProtectedRoute roles={["xarid"]}>
                            <Xarid />
                        </ProtectedRoute>
                    ),
                },
                {
                    path: "ishboshqaruvchi",
                    element: (
                        <ProtectedRoute roles={["ishboshqaruvchi"]}>
                            <Ishboshqaruvchi />
                        </ProtectedRoute>
                    ),
                },
            ],
        },
        { path: "*", element: <Navigate to="/not-found" replace /> },
        { path: "/not-found", element: <NotFound /> },
    ];


    return useRoutes(routes);
}

export default Rout;
