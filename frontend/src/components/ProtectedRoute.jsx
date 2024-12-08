import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token'); // Check for token in localStorage

    if (!token) {
        return <Navigate to="/login" replace />; // Redirect to login if not authenticated
    }

    return children; // Render the protected page if authenticated
};

export default ProtectedRoute;
