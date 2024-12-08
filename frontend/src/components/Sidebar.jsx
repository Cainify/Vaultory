import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiKey, FiCreditCard, FiSettings, FiLogOut, FiMoon, FiSun } from 'react-icons/fi';

const Sidebar = ({ toggleDarkMode, isDarkMode }) => {
    const location = useLocation();
    const [isExpanded, setIsExpanded] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove token from localStorage
        window.location.href = '/login'; // Redirect to login
    };

    const links = [
        { path: '/dashboard', label: 'Dashboard', icon: <FiHome /> },
        { path: '/vault', label: 'Vault', icon: <FiKey /> },
        { path: '/subscription', label: 'Subscription', icon: <FiCreditCard /> },
        { path: '/settings', label: 'Settings', icon: <FiSettings /> },
    ];

    return (
        <div
            onMouseEnter={() => setIsExpanded(true)}
            onMouseLeave={() => setIsExpanded(false)}
            className={`h-screen fixed flex flex-col justify-between transition-all duration-300 ${
                isExpanded ? 'w-56' : 'w-16'
            } ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'} shadow-lg`}
        >
            {/* Top Section */}
            <div className="flex flex-col items-center py-4">
                {/* App Name/Logo */}
                <h1
                    className={`text-2xl font-bold mb-8 transition-all duration-300 ${
                        isExpanded ? 'opacity-100 scale-100' : 'opacity-100 scale-100 text-center'
                    }`}
                >
                    {isExpanded ? 'Vaultory' : 'V'}
                </h1>
                <ul className="space-y-4 w-full px-2">
                    {links.map((link) => (
                        <li key={link.path} className="group">
                            <Link
                                to={link.path}
                                className={`flex items-center gap-4 px-4 py-3 rounded-md hover:bg-gray-700 dark:hover:bg-gray-800 transition-colors ${
                                    location.pathname === link.path
                                        ? isDarkMode
                                            ? 'bg-gray-700'
                                            : 'bg-gray-300'
                                        : ''
                                }`}
                            >
                                <span className="text-xl">{link.icon}</span>
                                <span
                                    className={`whitespace-nowrap text-sm font-medium transition-all duration-300 ${
                                        isExpanded ? 'opacity-100' : 'opacity-0 hidden'
                                    }`}
                                >
                                    {link.label}
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Bottom Section */}
            <div className="flex flex-col items-center space-y-4 py-4 border-t border-gray-300 dark:border-gray-700 w-full px-2">
                {/* Dark Mode Toggle */}
                <button
                    onClick={toggleDarkMode}
                    className="flex items-center gap-4 w-full px-4 py-3 rounded-md hover:bg-gray-700 dark:hover:bg-gray-800 transition-colors"
                >
                    <span className="text-xl">
                        {isDarkMode ? (
                            <FiSun className="text-yellow-400" />
                        ) : (
                            <FiMoon className="text-gray-500" />
                        )}
                    </span>
                    <span
                        className={`whitespace-nowrap text-sm font-medium transition-all duration-300 ${
                            isExpanded ? 'opacity-100' : 'opacity-0 hidden'
                        }`}
                    >
                        {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                    </span>
                </button>

                {/* Logout Button */}
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-4 w-full px-4 py-3 rounded-md hover:bg-red-500 dark:hover:bg-red-700 transition-colors"
                >
                    <span className="text-xl">
                        <FiLogOut className="text-red-500 dark:text-red-400" />
                    </span>
                    <span
                        className={`whitespace-nowrap text-sm font-medium transition-all duration-300 ${
                            isExpanded ? 'opacity-100' : 'opacity-0 hidden'
                        }`}
                    >
                        Logout
                    </span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
