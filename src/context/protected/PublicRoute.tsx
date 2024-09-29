
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../AuthContext";

const PublicRoute = () => {
    const { authenticated } = useAuth();

    if (authenticated) {
        // If the user is authenticated, redirect to the home page (or another protected route)
        return <Navigate to="/" />;
    }

    return <Outlet />; // If not authenticated, render the public routes (e.g., login page)
};

export default PublicRoute;
