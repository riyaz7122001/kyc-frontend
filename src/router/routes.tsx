import { lazy } from "react";
import PageNotFound from "../pages/notfound";
import CitizenPage from "../pages/citizen";

const Login = lazy(() => import("../pages/auth/login"));
const ForgotPassword = lazy(() => import("../pages/auth/forgotPassword"));
const ResetPassword = lazy(() => import("../pages/auth/resetPassword"));
const SetPassword = lazy(() => import("../pages/auth/setPassword"));
const AdminLayout = lazy(() => import("../pages/adminIndex"));
const AdminDashboard = lazy(() => import("../pages/dashboard/adminDashboard"));

export const routes = [
    {
        path: "/login",
        element: <Login />,
        needsAuth: false
    },
    {
        path: "/forgot-password",
        element: <ForgotPassword />,
        needsAuth: false
    },
    {
        path: "/reset-password",
        element: <ResetPassword />,
        needsAuth: false
    },
    {
        path: "/set-password",
        element: <SetPassword />,
        needsAuth: false
    },
    {
        path: "/",
        element: <AdminLayout />,
        children: [
            {
                path: "/admin",
                element: <AdminDashboard />,
                index: true,
                needsAuth: true
            },
            {
                path: "/citizen",
                element: <CitizenPage />,
                needsAuth: true
            }
        ],
    },
    {
        path: "*",
        element: <PageNotFound />,
        needsAuth: false
    }
];
