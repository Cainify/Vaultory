import React from 'react';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children }) => {
    const token = localStorage.getItem('token'); // Check for token in localStorage

    if (token) {
        return <Navigate to="/dashboard" replace />; // Redirect to dashboard if authenticated
    }

    return children; // Render the public page if not authenticated
};

export default PublicRoute;
