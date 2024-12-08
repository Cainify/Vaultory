import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/auth'; // API helper for login

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
    
        try {
            const response = await login(formData); // Call login API
            console.log('Login Response:', response.data); // Debugging
    
            const token = response.data?.token;
            if (!token) {
                throw new Error('No token received from server');
            }
    
            localStorage.setItem('token', token); // Save token to localStorage
            navigate('/dashboard'); // Redirect to dashboard
        } catch (err) {
            console.error('Login Error:', err.message); // Debugging
            setError(err.response?.data?.error || 'Failed to log in');
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
            <h1 className="text-4xl font-bold mb-8 text-gray-800 dark:text-gray-100">Login</h1>
            <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-lg shadow">
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-4 mb-4 bg-gray-200 dark:bg-gray-700 rounded text-black dark:text-white"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full p-4 mb-6 bg-gray-200 dark:bg-gray-700 rounded text-black dark:text-white"
                        required
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded"
                    >
                        Login
                    </button>
                </form>
                <p className="mt-6 text-center text-gray-600 dark:text-gray-400">
                    Don't have an account?{' '}
                    <a href="/register" className="text-blue-500 hover:underline">
                        Register here
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Login;
