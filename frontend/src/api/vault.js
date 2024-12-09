import axios from 'axios';

const API_URL = `${process.env.REACT_APP_API_URL}/vault`;

export const getAllCredentials = async (token) => {
    return axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

export const addCredential = async (data, token) => {
    return axios.post(API_URL, data, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

export const deleteCredential = async (id, token) => {
    return axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

export const updateCredential = async (id, data, token) => {
    return axios.put(`${API_URL}/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
    });
}