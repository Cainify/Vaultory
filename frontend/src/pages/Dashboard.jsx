import React, { useEffect, useState } from 'react';
import { FiKey, FiCreditCard, FiSettings, FiInfo } from 'react-icons/fi';
import { getDashboardStats } from '../api/stats'; // Ensure the path matches your project structure

const Dashboard = () => {
    const [stats, setStats] = useState({
        totalCredentials: 0,
        upcomingExpirations: [],
        subscriptionPlan: 'Free',
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const token = localStorage.getItem('token'); // Retrieve the token for authentication
                const data = await getDashboardStats(token); // Fetch stats from API
                setStats(data);
            } catch (err) {
                setError('Failed to fetch dashboard stats.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) {
        return (
            <div className="flex-grow flex items-center justify-center">
                <p className="text-gray-800 dark:text-gray-100 text-lg">Loading...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex-grow flex items-center justify-center">
                <p className="text-red-500">{error}</p>
            </div>
        );
    }

    const statsCards = [
        {
            title: 'Total Credentials',
            value: stats.totalCredentials,
            color: 'text-blue-500 dark:text-blue-400',
        },
        {
            title: 'Upcoming Expirations',
            value: stats.upcomingExpirations.length,
            color: 'text-yellow-500 dark:text-yellow-400',
        },
        {
            title: 'Subscription Plan',
            value: stats.subscriptionPlan,
            color: 'text-green-500 dark:text-green-400',
            capitalize: true,
        },
    ];

    const navCards = [
        {
            title: 'Vault',
            description: 'Securely store and manage your credentials with ease.',
            icon: <FiKey className="text-3xl text-blue-500 dark:text-blue-400 mr-4" />,
            link: '/vault',
            linkText: 'Go to Vault →',
        },
        {
            title: 'Subscription',
            description: 'Manage your subscription plans and track your usage.',
            icon: <FiCreditCard className="text-3xl text-green-500 dark:text-green-400 mr-4" />,
            link: '/subscription',
            linkText: 'Manage Subscription →',
        },
        {
            title: 'Settings',
            description: 'Update your preferences and account details.',
            icon: <FiSettings className="text-3xl text-purple-500 dark:text-purple-400 mr-4" />,
            link: '/settings',
            linkText: 'Go to Settings →',
        },
        {
            title: 'About Vaultory',
            description: 'Learn more about the features and security of Vaultory.',
            icon: <FiInfo className="text-3xl text-yellow-500 dark:text-yellow-400 mr-4" />,
            link: '/about',
            linkText: 'Learn More →',
        },
    ];

    return (
        <div className="flex-grow p-8 mx-8">
            {/* Title */}
            <h1 className="text-4xl font-bold mb-8 text-gray-800 dark:text-gray-100">
                Welcome to Vaultory
            </h1>

            {/* Quick Stats Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl mx-auto mb-8">
                {statsCards.map((card, index) => (
                    <div
                        key={index}
                        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                    >
                        <h3 className="text-lg font-bold mb-2 text-gray-800 dark:text-gray-100">
                            {card.title}
                        </h3>
                        <p
                            className={`text-3xl ${
                                card.capitalize ? 'capitalize' : ''
                            } ${card.color}`}
                        >
                            {card.value}
                        </p>
                    </div>
                ))}
            </div>

            {/* Navigation Sections */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl mx-auto">
                {navCards.map((card, index) => (
                    <div
                        key={index}
                        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col"
                    >
                        <div className="flex items-center mb-4">
                            {card.icon}
                            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                                {card.title}
                            </h2>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">{card.description}</p>
                        <a
                            href={card.link}
                            className="text-blue-500 dark:text-blue-400 mt-auto self-start hover:underline"
                        >
                            {card.linkText}
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;