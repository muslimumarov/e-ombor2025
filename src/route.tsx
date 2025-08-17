// src/route.tsx
import { RouteObject, useRoutes } from "react-router-dom";
import BaseLayout from "./layouts/base/BaseLayout";
import Boshliq from "./pages/nazorat/Boshliq";
import Bugalter from "./pages/bugalteriya/Bugalteriya";
import Xarid from "./pages/xarid/Xarid";
import Ishboshqaruvchi from "./pages/ishboshqaruvchi/Ishboshqaruvchi";
import Login from "./layouts/auth/login/Login";
import ProtectedRoute from "./Services/ProtectedRoute.tsx";
import Omborchi from "./pages/Omborchi/Omborchi";

function Rout() {
    const routes: RouteObject[] = [
        { path: "/login", element: <Login /> },
        {
            path: "/",
            element: <ProtectedRoute />, // umumiy guard (faqat authed)
            children: [
                {
                    path: "",
                    element: <BaseLayout />,
                    children: [
                        { path: "dashboard", element: <Boshliq /> },
                        { path: "bugalter", element: <ProtectedRoute role="bugalter" /> },
                        { path: "bugalter", element: <Bugalter /> },
                        { path: "omborchi", element: <ProtectedRoute role="omborchi" /> },
                        { path: "omborchi", element: <Omborchi /> },
                        { path: "xarid", element: <ProtectedRoute role="xarid" /> },
                        { path: "xarid", element: <Xarid /> },
                        { path: "ishboshqaruvchi", element: <ProtectedRoute role="ishboshqaruvchi" /> },
                        { path: "ishboshqaruvchi", element: <Ishboshqaruvchi /> },
                    ],
                },
                { path: "*", element: <Login /> },
            ],
        },
    ];

    return useRoutes(routes);
}

export default Rout;
