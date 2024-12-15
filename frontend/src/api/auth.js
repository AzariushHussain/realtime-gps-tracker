import axios from 'axios';

const API_URL = 'http://localhost:8000/api/auth/';

export const loginUser = async (username, password) => {
    try {
        const response = await axios.post(`${API_URL}login`, { username, password });
        return response.data;
    } catch (error) {
        return null;
    }
    };

export const registerUser = async (username, password, role) => {
    try {
        const response = await axios.post(`${API_URL}register`, { username, password, role});
        return response.data;
    } catch (error) {
        return null;
    }
};