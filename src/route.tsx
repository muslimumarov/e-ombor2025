import { RouteObject, useRoutes } from "react-router-dom";
import BaseLayout from "./layouts/base/BaseLayout.tsx";
import Login from "./layouts/auth/login/Login.tsx";
import Nazorat from "./pages/dashboard/Nazorat.tsx";

function Rout() {
    const routes: RouteObject[] = [
        {
            path: "/login",
            element: <Login />,
        },
        {
            path: "/",
            element: <BaseLayout />,
            children: [
                {
                    path: "dashboard",
                    element: <Nazorat />,
                },
            ],
        },
    ];

    return useRoutes(routes);
}

export default Rout;
