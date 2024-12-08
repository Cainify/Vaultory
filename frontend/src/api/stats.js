import axios from 'axios';

const API_URL = 'http://localhost:5000/api/stats'; // Ensure this matches your backend setup

export const getDashboardStats = async (token) => {
    try {
        const response = await axios.get(API_URL, {
            headers: { Authorization: `Bearer ${token}` }, // Include token if required
        });
        return response.data;
    } catch (err) {
        console.error('Error fetching dashboard stats:', err.message);
        throw err;
    }
};
