// src/route.tsx
import { RouteObject, useRoutes } from "react-router-dom";
import BaseLayout from "./layouts/base/BaseLayout";
import Boshliq from "./pages/nazorat/Boshliq";
import Bugalter from "./pages/bugalteriya/Bugalteriya";
import Xarid from "./pages/xarid/Xarid";
import Ishboshqaruvchi from "./pages/ishboshqaruvchi/Ishboshqaruvchi";
import Login from "./layouts/auth/login/Login";
import Omborchi from "./pages/Omborchi/Omborchi";
import ProtectedRoute from "./Services/ProtectedRoute.tsx";

function Rout() {
    const routes: RouteObject[] = [
        { path: "/login", element: <Login /> },
        {
            path: "/",
            element: <ProtectedRoute />,
            children: [
                {
                    path: "",
                    element: <BaseLayout />,
                    children: [
                        { path: "dashboard", element: <Boshliq /> },
                        { path: "bugalter", element: <ProtectedRoute role="bugalter"><Bugalter /></ProtectedRoute> },
                        { path: "omborchi", element: <ProtectedRoute role="omborchi"><Omborchi /></ProtectedRoute> },
                        { path: "xarid", element: <ProtectedRoute role="xarid"><Xarid /></ProtectedRoute> },
                        { path: "ishboshqaruvchi", element: <ProtectedRoute role="ishboshqaruvchi"><Ishboshqaruvchi /></ProtectedRoute> },
                    ],
                },
                { path: "*", element: <Login /> },
            ],
        },
    ];

    return useRoutes(routes);
}

export default Rout;
