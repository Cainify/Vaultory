import axios from 'axios';

const API_URL = `${process.env.REACT_APP_API_URL}/auth`;

export const register = async (data) => {
    return axios.post(`${API_URL}/register`, data);
};

export const login = async (data) => {
    return axios.post(`${API_URL}/login`, data);
};
