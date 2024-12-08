import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <nav className="bg-blue-600 text-white">
            <div className="container mx-auto flex items-center justify-between p-4">
                <h1 className="text-2xl font-bold">Vaultory</h1>
                <div className="hidden md:flex space-x-6">
                    <Link to="/dashboard" className="hover:text-gray-200">Dashboard</Link>
                    <Link to="/vault" className="hover:text-gray-200">Vault</Link>
                    <Link to="/subscription" className="hover:text-gray-200">Subscription</Link>
                    <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded hover:bg-red-600">
                        Logout
                    </button>
                </div>
                <button
                    className="md:hidden block"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <span className="material-icons">menu</span>
                </button>
            </div>
            {isOpen && (
                <div className="md:hidden bg-blue-700 p-4">
                    <Link to="/dashboard" className="block hover:text-gray-200">Dashboard</Link>
                    <Link to="/vault" className="block hover:text-gray-200">Vault</Link>
                    <Link to="/subscription" className="block hover:text-gray-200">Subscription</Link>
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 w-full mt-4 px-4 py-2 rounded hover:bg-red-600"
                    >
                        Logout
                    </button>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
