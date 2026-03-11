import axios from 'axios';
import { getToken } from './tokenUtils';

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/comic';
export const axiosInstance = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Thêm interceptor để xử lý request và response (nếu cần)
axiosInstance.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);

