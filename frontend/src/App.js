import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Vault from './pages/Vault';
import Subscription from './pages/Subscription';
import Sidebar from './components/Sidebar';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';

const App = () => {
    // Initialize dark mode from localStorage or default to true
    const [darkMode, setDarkMode] = useState(() => {
        const storedPreference = localStorage.getItem('darkMode');
        return storedPreference !== null ? JSON.parse(storedPreference) : true;
    });

    useEffect(() => {
        // Apply dark mode class to the <html> element
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }

        // Store preference in localStorage
        localStorage.setItem('darkMode', JSON.stringify(darkMode));
    }, [darkMode]);

    const toggleDarkMode = () => setDarkMode((prev) => !prev);

    const AppContent = () => {
        const location = useLocation();
        const isAuthPage = ['/login', '/register'].includes(location.pathname);

        return (
            <div className="flex min-h-screen z-10 bg-gray-100 dark:bg-gray-900">
                {/* Sidebar */}
                {!isAuthPage && (
                    <Sidebar toggleDarkMode={toggleDarkMode} isDarkMode={darkMode} />
                )}

                {/* Main Content */}
                <div
                    className={`flex-grow transition-all duration-300 ${
                        !isAuthPage ? 'ml-16 mx-auto' : ''
                    }`}
                >
                    <Routes>
                        {/* Public Routes */}
                        <Route
                            path="/login"
                            element={
                                <PublicRoute>
                                    <Login toggleDarkMode={toggleDarkMode} isDarkMode={darkMode} />
                                </PublicRoute>
                            }
                        />
                        <Route
                            path="/register"
                            element={
                                <PublicRoute>
                                    <Register toggleDarkMode={toggleDarkMode} isDarkMode={darkMode} />
                                </PublicRoute>
                            }
                        />

                        {/* Protected Routes */}
                        <Route
                            path="/dashboard"
                            element={
                                <ProtectedRoute>
                                    <Dashboard />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/vault"
                            element={
                                <ProtectedRoute>
                                    <Vault />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/subscription"
                            element={
                                <ProtectedRoute>
                                    <Subscription />
                                </ProtectedRoute>
                            }
                        />

                        {/* Redirect Root */}
                        <Route path="/" element={<Navigate to="/dashboard" replace />} />
                    </Routes>
                </div>
            </div>
        );
    };

    return (
        <Router>
            <AppContent />
        </Router>
    );
};

export default App;
