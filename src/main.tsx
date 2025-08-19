import React from "react";
import ReactDom from "react-dom/client";
import {BrowserRouter} from "react-router-dom";
import {AuthProvider} from "./contexts/AuthContext.tsx"
import App from "./App";
import "./i18n.ts";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import {ToastContainer} from "react-toastify";

ReactDom.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <App/>
                <ToastContainer position="top-right" autoClose={3000}/>
            </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>
)