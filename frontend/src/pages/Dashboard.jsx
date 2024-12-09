import React from 'react';
import { FiKey, FiCreditCard, FiSettings, FiInfo } from 'react-icons/fi';

const Dashboard = () => {
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
        <div className="flex-grow px-4 py-8 sm:px-8 sm:py-12 mx-auto max-w-screen-lg">
            <h1 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-gray-800 dark:text-gray-100 text-center">
                Welcome to Vaultory
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {navCards.map((card, index) => (
                    <div
                        key={index}
                        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col"
                    >
                        <div className="flex items-center mb-4">
                            {card.icon}
                            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-100">
                                {card.title}
                            </h2>
                        </div>
                        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4">{card.description}</p>
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