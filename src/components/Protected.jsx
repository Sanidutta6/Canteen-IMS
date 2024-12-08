import React, { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext'; // Adjust the import path as necessary
import { useNavigate } from 'react-router-dom';

const Protected = ({ authRequired = false, children }) => {
    const { isAuthenticated, loading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        // Redirect to home page if authentication is required and user is not authenticated
        if (!loading && authRequired && !isAuthenticated) {
            navigate("/login");
        }
    }, [loading, authRequired, isAuthenticated, navigate]);

    // Wait until the authentication status is determined
    if (loading) {
        return <div>Loading...</div>; // Optionally add a loading spinner or message
    }

    // If authentication is required and the user is not authenticated, show a "Not Authorized" message
    if (authRequired && !isAuthenticated) {
        return null; // Optionally return a "Not Authorized" message or redirect
    }

    // Render the children if the user is authenticated or if authentication is not required
    return <>{children}</>;
};

export default Protected;