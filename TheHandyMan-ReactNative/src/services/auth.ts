// filepath: c:\Users\Escobar\Documents\Programing\ReactNative\TheHandyMan-ReactNative\src\services\auth.ts
import { Auth } from '../types/auth';

const API_URL = 'https://your-api-url.com/api'; // Replace with your actual API URL

export const registerUser = async (userData: Auth) => {
    try {
        const response = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });
        return await response.json();
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
};

export const loginUser = async (credentials: { email: string; password: string }) => {
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });
        return await response.json();
    } catch (error) {
        console.error('Error logging in user:', error);
        throw error;
    }
};