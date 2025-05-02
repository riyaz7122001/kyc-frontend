import { Navigate } from "react-router-dom";
import { isUserAuthenticated } from "../helpers";

type AuthRouteProps = {
    needsAuth: boolean;
}

export default function AuthRoute({ children, needsAuth = false }: React.PropsWithChildren<AuthRouteProps>) {
    const isAuthenticated = isUserAuthenticated();
    // if user is not authenticated and trying to access private routes then redirect to login
    if (needsAuth && !isAuthenticated) {
        return <Navigate to='/login' />
    }

    // if user is authenticated and trying to access public routes then redirect to /page
    if (!needsAuth && isAuthenticated) {
        return <Navigate to="/" />
    }

    return children;
}