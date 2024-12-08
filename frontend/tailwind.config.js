/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class', // Enable dark mode with a class
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: '#1a202c', // Dark mode background
                secondary: '#2d3748', // Sidebar accent
                accent: '#4a5568', // Subtle accent
            },
            spacing: {
                'sidebar-min': '4rem', // Minimized sidebar width
                'sidebar-max': '14rem', // Expanded sidebar width
            },
        },
    },
    plugins: [],
};
