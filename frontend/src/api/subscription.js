import axios from 'axios';

const API_URL = 'http://localhost:5000/api/subscription';

export const getSubscription = async () => {
    const token = localStorage.getItem('token');
    const response = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

export const updateSubscription = async (data) => {
    const token = localStorage.getItem('token');
    const response = await axios.put(API_URL, data, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};
