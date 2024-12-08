import React, { useState } from 'react';
import { register } from '../api/auth'; // Adjust the path as necessary

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        try {
            await register({
                username: formData.name,
                email: formData.email,
                password: formData.password,
            });
            setSuccess('Registration successful! Redirecting to login...');
            setTimeout(() => {
                window.location.href = '/login';
            }, 2000);
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to register. Please try again.');
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
            <h1 className="text-4xl font-bold mb-8 text-gray-800 dark:text-gray-100">Register</h1>
            <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-lg shadow">
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                {success && <p className="text-green-500 text-center mb-4">{success}</p>}
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full p-4 mb-4 bg-gray-200 dark:bg-gray-700 rounded text-black dark:text-white"
                        required
                    />
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
                        className="w-full p-4 mb-4 bg-gray-200 dark:bg-gray-700 rounded text-black dark:text-white"
                        required
                    />
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="w-full p-4 mb-6 bg-gray-200 dark:bg-gray-700 rounded text-black dark:text-white"
                        required
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded"
                    >
                        Register
                    </button>
                </form>
                <p className="mt-6 text-center text-gray-600 dark:text-gray-400">
                    Already have an account?{' '}
                    <a href="/login" className="text-blue-500 hover:underline">
                        Login here
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Register;
