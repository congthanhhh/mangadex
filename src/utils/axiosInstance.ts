import axios from 'axios';
import { getToken } from './tokenUtils';

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/comic',
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

//Jikan API
export const jikanApi = axios.create({
    baseURL: 'https://api.jikan.moe/v4',
    headers: {
        'Content-Type': 'application/json',
    },
});
