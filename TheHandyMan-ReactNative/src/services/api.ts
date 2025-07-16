import axios from 'axios';

const API_BASE_URL = 'https://api.example.com'; // Replace with your actual API base URL

// Function to handle GET requests
export const get = async (endpoint) => {
    try {
        const response = await axios.get(`${API_BASE_URL}${endpoint}`);
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching data: ${error.message}`);
    }
};

// Function to handle POST requests
export const post = async (endpoint, data) => {
    try {
        const response = await axios.post(`${API_BASE_URL}${endpoint}`, data);
        return response.data;
    } catch (error) {
        throw new Error(`Error posting data: ${error.message}`);
    }
};

// Function to handle PUT requests
export const put = async (endpoint, data) => {
    try {
        const response = await axios.put(`${API_BASE_URL}${endpoint}`, data);
        return response.data;
    } catch (error) {
        throw new Error(`Error updating data: ${error.message}`);
    }
};

// Function to handle DELETE requests
export const del = async (endpoint) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}${endpoint}`);
        return response.data;
    } catch (error) {
        throw new Error(`Error deleting data: ${error.message}`);
    }
};