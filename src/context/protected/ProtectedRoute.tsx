
import { Navigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../AuthContext";

const ProtectedRoute = () => {
    const { authenticated, user } = useAuth();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user !== null || !authenticated) {
            setLoading(false);
        }
    }, [user, authenticated]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!authenticated) {
        return <Navigate to="/auth" />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
