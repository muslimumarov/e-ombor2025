import { RouteObject, useRoutes } from "react-router-dom";
import BaseLayout from "./layouts/base/BaseLayout.tsx";
import Dashboard from "./pages/dashboard/Dashboard.tsx";
import Login from "./layouts/auth/login/Login.tsx";

function Router () {
    const routes: RouteObject[] = [
        {
            path: 'login',
            element: <Login/>
        },
        {
            path: '/',
            element: (
                <BaseLayout/>
            ),
            children: [
                {
                    path: "dashboard",
                    element: (
                        <Dashboard/>
                    ),
                },
            ]
        },
        {
        }
    ]
    return useRoutes(routes)
}
export default Router;