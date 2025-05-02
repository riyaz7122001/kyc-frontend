import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "./routes";
import { Suspense } from "react";
import Loader from "../components/customSpinner";
import AuthRoute from "./authRoute";

const router = createBrowserRouter(routes.map(route => {
    const element = (
        <Suspense fallback={<Loader />}> {route.element}</ Suspense>
    )
    return {
        ...route,
        element: <AuthRoute needsAuth={route.needsAuth}>{element}</AuthRoute>
    }
}))

const Router = () => <RouterProvider router={router} />

export default Router;
