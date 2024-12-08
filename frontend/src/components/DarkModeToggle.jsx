import React, { useEffect, useState } from 'react';

const DarkModeToggle = () => {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        // Check user preference from localStorage or default to light mode
        return localStorage.getItem('darkMode') === 'true';
    });

    const toggleDarkMode = () => {
        setIsDarkMode((prev) => {
            const newMode = !prev;
            localStorage.setItem('darkMode', newMode); // Store user choice
            document.documentElement.classList.toggle('dark', newMode); // Update dark mode
            return newMode;
        });
    };

    useEffect(() => {
        // Set initial dark mode based on user preference
        document.documentElement.classList.toggle('dark', isDarkMode);
    }, [isDarkMode]);

    return (
        <label className="flex items-center cursor-pointer">
            <span className="mr-2 text-sm">Dark Mode</span>
            <div className="relative">
                <input
                    type="checkbox"
                    className="sr-only"
                    checked={isDarkMode}
                    onChange={toggleDarkMode}
                />
                <div className="w-10 h-5 bg-gray-300 rounded-full shadow-inner dark:bg-gray-700"></div>
                <div
                    className={`absolute w-5 h-5 bg-white rounded-full shadow transform transition-transform ${
                        isDarkMode ? 'translate-x-5' : 'translate-x-0'
                    }`}
                ></div>
            </div>
        </label>
    );
};

export default DarkModeToggle;