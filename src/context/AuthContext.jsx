import React, { createContext, useState, useContext, useEffect } from 'react';
import { authAPI, pointsAPI } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [points, setPoints] = useState(0);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            loadUser();
        } else {
            setLoading(false);
        }
    }, []);

    const loadUser = async () => {
        try {
            const response = await authAPI.getProfile();
            setUser(response.data.data);
            setPoints(response.data.data.points);
        } catch (error) {
            console.error('Error loading user:', error);
            localStorage.removeItem('token');
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        try {
            const response = await authAPI.login({ email, password });
            const { token, ...userData } = response.data.data;
            localStorage.setItem('token', token);
            setUser(userData);
            setPoints(userData.points);
            return { success: true };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Login failed'
            };
        }
    };

    const register = async (name, email, phone, password) => {
        try {
            const response = await authAPI.register({ name, email, phone, password });
            const { token, ...userData } = response.data.data;
            localStorage.setItem('token', token);
            setUser(userData);
            setPoints(userData.points);
            return { success: true };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Registration failed'
            };
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        setPoints(0);
        window.location.href = '/';
    };

    const refreshPoints = async () => {
        try {
            const response = await pointsAPI.getBalance();
            setPoints(response.data.data.points);
        } catch (error) {
            console.error('Error refreshing points:', error);
        }
    };

    const value = {
        user,
        points,
        loading,
        login,
        register,
        logout,
        refreshPoints
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
