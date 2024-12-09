import axios from 'axios';

const API_URL = 'http://api.vaultory.net/api/auth';

export const register = async (data) => {
    return axios.post(`${API_URL}/register`, data);
};

export const login = async (data) => {
    return axios.post(`${API_URL}/login`, data);
};
