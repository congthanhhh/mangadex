import axios from 'axios';
import { getToken } from './tokenUtils';

// Development: gọi trực tiếp backend qua env hoặc localhost
// Production (Netlify): dùng proxy /api được cấu hình trong netlify.toml
const baseURL =
    import.meta.env.MODE === 'development'
        ? (import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/comic')
        : '/api';

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

