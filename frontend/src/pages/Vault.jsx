import React, { useEffect, useState, useCallback } from 'react';
import { getAllCredentials, addCredential, deleteCredential, updateCredential } from '../api/vault';
import { FiPlus, FiEdit, FiTrash2, FiChevronDown, FiChevronUp, FiEye, FiEyeOff, FiCopy } from 'react-icons/fi';

const CredentialRow = ({ credential, onDelete, onEdit }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
        alert('Copied to clipboard!');
    };

    return (
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg mb-4 p-4">
            <div className="flex justify-between items-center">
                <div>
                    <p className="text-xl font-semibold">{credential.name}</p>
                    <p className="text-gray-500">{credential.description}</p>
                    <p className="text-sm text-gray-400">Category: {credential.category || 'Uncategorized'}</p>
                </div>
                <div className="flex space-x-3">
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="text-blue-500 hover:text-blue-600"
                        title={isExpanded ? 'Collapse' : 'Expand'}
                    >
                        {isExpanded ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
                    </button>
                    <button
                        onClick={() => onEdit(credential)}
                        className="text-green-500 hover:text-green-600"
                        title="Edit Credential"
                    >
                        <FiEdit size={20} />
                    </button>
                    <button
                        onClick={() => onDelete(credential.id)}
                        className="text-red-500 hover:text-red-600"
                        title="Delete Credential"
                    >
                        <FiTrash2 size={20} />
                    </button>
                </div>
            </div>
            {isExpanded && (
                <div className="mt-4 border-t pt-4 border-gray-300 dark:border-gray-700">
                    <div className="mb-2 flex items-center">
                        <strong className="mr-2">Username:</strong>
                        <span>{credential.username || 'N/A'}</span>
                        <button
                            onClick={() => handleCopy(credential.username || '')}
                            className="ml-2 text-blue-500 hover:text-blue-600"
                            title="Copy Username"
                        >
                            <FiCopy size={16} />
                        </button>
                    </div>
                    <div className="flex items-center">
                        <strong className="mr-2">Password:</strong>
                        {showPassword ? (
                            <span>{credential.password}</span>
                        ) : (
                            <span className="text-gray-400">••••••••</span>
                        )}
                        <button
                            onClick={() => setShowPassword(!showPassword)}
                            className="ml-2 text-blue-500 hover:text-blue-600"
                            title={showPassword ? 'Hide Password' : 'Show Password'}
                        >
                            {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                        </button>
                        <button
                            onClick={() => handleCopy(credential.password || '')}
                            className="ml-2 text-blue-500 hover:text-blue-600"
                            title="Copy Password"
                        >
                            <FiCopy size={16} />
                        </button>
                    </div>
                    <p className="text-sm text-gray-400 mt-4">
                        <strong>Created By:</strong> {credential.created_by || 'Unknown'} |{' '}
                        <strong>Created At:</strong> {new Date(credential.created_at).toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-400">
                        <strong>Last Edited By:</strong> {credential.edited_by || 'N/A'}
                    </p>
                </div>
            )}
        </div>
    );
};

const Vault = () => {
    const [credentials, setCredentials] = useState([]);
    const [filteredCredentials, setFilteredCredentials] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [newCredential, setNewCredential] = useState({
        name: '',
        description: '',
        username: '',
        password: '',
        category: '',
    });
    const [editingCredential, setEditingCredential] = useState(null);
    const [error, setError] = useState('');
    const [showForm, setShowForm] = useState(false);
    const token = localStorage.getItem('token');

    const fetchCredentials = useCallback(async () => {
        try {
            const { data } = await getAllCredentials(token);
            setCredentials(data);
            setFilteredCredentials(data);
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to fetch credentials');
        }
    }, [token]);

    useEffect(() => {
        fetchCredentials();
    }, [fetchCredentials]);

    useEffect(() => {
        const lowerCaseQuery = searchQuery.toLowerCase();
        setFilteredCredentials(
            credentials.filter(
                (credential) =>
                    credential.name.toLowerCase().includes(lowerCaseQuery) ||
                    credential.description.toLowerCase().includes(lowerCaseQuery) ||
                    (credential.category || '').toLowerCase().includes(lowerCaseQuery)
            )
        );
    }, [searchQuery, credentials]);

    const handleAddCredential = async (e) => {
        e.preventDefault();
        try {
            await addCredential(newCredential, token);
            setNewCredential({ name: '', description: '', username: '', password: '', category: '' });
            setShowForm(false);
            fetchCredentials();
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to add credential');
        }
    };

    const handleEditCredential = async (e) => {
        e.preventDefault();
        try {
            await updateCredential(editingCredential.id, editingCredential, token);
            setEditingCredential(null);
            fetchCredentials();
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to update credential');
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteCredential(id, token);
            fetchCredentials();
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to delete credential');
        }
    };

    return (
        <div className="flex-grow p-4 sm:p-8 lg:p-16 mx-4 lg:mx-24">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Vault</h1>
                <button
                    onClick={() => setShowForm(true)}
                    className="bg-blue-500 hover:bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg"
                    title="Add Credential"
                >
                    <FiPlus size={24} />
                </button>
            </div>
            {error && <p className="text-red-500">{error}</p>}

            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Search credentials..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full p-3 border rounded text-black dark:text-white bg-gray-200 dark:bg-gray-700"
                />
            </div>

            {showForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md relative">
                        <button
                            onClick={() => setShowForm(false)}
                            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                        >
                            ✖
                        </button>
                        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">Add New Credential</h2>
                        <form onSubmit={handleAddCredential}>
                            <input
                                type="text"
                                placeholder="Name"
                                value={newCredential.name}
                                onChange={(e) => setNewCredential({ ...newCredential, name: e.target.value })}
                                className="w-full p-3 border rounded mb-4 text-black dark:text-white bg-gray-200 dark:bg-gray-700"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Description"
                                value={newCredential.description}
                                onChange={(e) =>
                                    setNewCredential({ ...newCredential, description: e.target.value })
                                }
                                className="w-full p-3 border rounded mb-4 text-black dark:text-white bg-gray-200 dark:bg-gray-700"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Category"
                                value={newCredential.category}
                                onChange={(e) =>
                                    setNewCredential({ ...newCredential, category: e.target.value })
                                }
                                className="w-full p-3 border rounded mb-4 text-black dark:text-white bg-gray-200 dark:bg-gray-700"
                            />
                            <input
                                type="text"
                                placeholder="Username"
                                value={newCredential.username}
                                onChange={(e) =>
                                    setNewCredential({ ...newCredential, username: e.target.value })
                                }
                                className="w-full p-3 border rounded mb-4 text-black dark:text-white bg-gray-200 dark:bg-gray-700"
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={newCredential.password}
                                onChange={(e) =>
                                    setNewCredential({ ...newCredential, password: e.target.value })
                                }
                                className="w-full p-3 border rounded mb-4 text-black dark:text-white bg-gray-200 dark:bg-gray-700"
                                required
                            />
                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600"
                            >
                                Add Credential
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {editingCredential && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md relative">
                        <button
                            onClick={() => setEditingCredential(null)}
                            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                        >
                            ✖
                        </button>
                        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">Edit Credential</h2>
                        <form onSubmit={handleEditCredential}>
                            <input
                                type="text"
                                placeholder="Name"
                                value={editingCredential.name}
                                onChange={(e) =>
                                    setEditingCredential({ ...editingCredential, name: e.target.value })
                                }
                                className="w-full p-3 border rounded mb-4 text-black dark:text-white bg-gray-200 dark:bg-gray-700"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Description"
                                value={editingCredential.description}
                                onChange={(e) =>
                                    setEditingCredential({ ...editingCredential, description: e.target.value })
                                }
                                className="w-full p-3 border rounded mb-4 text-black dark:text-white bg-gray-200 dark:bg-gray-700"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Category"
                                value={editingCredential.category}
                                onChange={(e) =>
                                    setEditingCredential({ ...editingCredential, category: e.target.value })
                                }
                                className="w-full p-3 border rounded mb-4 text-black dark:text-white bg-gray-200 dark:bg-gray-700"
                            />
                            <input
                                type="text"
                                placeholder="Username"
                                value={editingCredential.username}
                                onChange={(e) =>
                                    setEditingCredential({ ...editingCredential, username: e.target.value })
                                }
                                className="w-full p-3 border rounded mb-4 text-black dark:text-white bg-gray-200 dark:bg-gray-700"
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={editingCredential.password}
                                onChange={(e) =>
                                    setEditingCredential({ ...editingCredential, password: e.target.value })
                                }
                                className="w-full p-3 border rounded mb-4 text-black dark:text-white bg-gray-200 dark:bg-gray-700"
                                required
                            />
                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600"
                            >
                                Save Changes
                            </button>
                        </form>
                    </div>
                </div>
            )}

            <div className="space-y-4">
                {filteredCredentials.map((cred) => (
                    <CredentialRow
                        key={cred.id}
                        credential={cred}
                        onDelete={handleDelete}
                        onEdit={setEditingCredential}
                    />
                ))}
            </div>
        </div>
    );
};

export default Vault;