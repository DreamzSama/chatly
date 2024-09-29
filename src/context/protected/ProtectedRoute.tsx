
import { Navigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../AuthContext";

const ProtectedRoute = () => {
    const { authenticated, user } = useAuth();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // When authentication check is complete (whether user exists or not)
        if (user !== null || !authenticated) {
            setLoading(false);
        }
    }, [user, authenticated]);

    if (loading) {
        return <div>Loading...</div>; // Optionally display a loading state
    }

    if (!authenticated) {
        // If user is not authenticated, redirect to the login page
        return <Navigate to="/auth" />;
    }

    return <Outlet />; // If authenticated, render the child routes (protected content)
};

export default ProtectedRoute;
