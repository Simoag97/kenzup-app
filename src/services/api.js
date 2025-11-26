import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Auth API
export const authAPI = {
    register: (userData) => api.post('/auth/register', userData),
    login: (credentials) => api.post('/auth/login', credentials),
    getProfile: () => api.get('/auth/profile')
};

// Points API
export const pointsAPI = {
    getBalance: () => api.get('/points/balance'),
    cashIn: (amount) => api.post('/points/cash-in', { amount })
};

// Transfers API
export const transfersAPI = {
    send: (recipientPhone, amount) => api.post('/transfers/send', { recipientPhone, amount }),
    getHistory: () => api.get('/transfers/history')
};

// Transactions API
export const transactionsAPI = {
    getAll: () => api.get('/transactions'),
    getById: (id) => api.get(`/transactions/${id}`)
};

// Driver API
export const driverAPI = {
    generateToken: (amount, description) => api.post('/driver/generate-token', { amount, description }),
    getTokens: () => api.get('/driver/tokens')
};

// Shop API
export const shopAPI = {
    redeemToken: (token) => api.post('/shop/redeem-token', { token })
};

export default api;
