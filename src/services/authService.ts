
import axiosInstance from "../utils/axiosInstance";
import { setToken, removeToken, getToken } from "../utils/tokenUtils";
import { LoginRequest, LoginResponse } from "../types/AuthTypes";

export const loginApi = async (credentials: LoginRequest): Promise<{ success: boolean; message?: string }> => {
    try {
        const response = await axiosInstance.post<LoginResponse>('/auth/token', credentials);

        if (response.data && response.data.result && response.data.result.token) {
            // Store the token in localStorage
            setToken(response.data.result.token);
            return { success: true };
        } else {
            return {
                success: false,
                message: response.data.message || 'Login failed: No token received'
            };
        }
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || error.message || 'Login failed';
        return {
            success: false,
            message: errorMessage
        };
    }
};

export const authenticateWithGoogle = async (authCode: string): Promise<{ success: boolean; message?: string }> => {
    try {
        const response = await axiosInstance.post<LoginResponse>(
            `/auth/outbound/authentication?code=${authCode}`
        );

        if (response.data && response.data.result && response.data.result.token) {
            // Store the token in localStorage
            setToken(response.data.result.token);
            return { success: true };
        } else {
            return {
                success: false,
                message: response.data.message || 'Google authentication failed: No token received'
            };
        }
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || error.message || 'Google authentication failed';
        return {
            success: false,
            message: errorMessage
        };
    }
};

export const logoutApi = async (): Promise<void> => {
    try {
        const token = getToken();
        if (!token) {
            throw new Error('No token found');
        }
        await axiosInstance.post('/auth/logout', token);
        removeToken();
    } catch (error: any) {
        console.error('Logout failed:', error);
        throw new Error(error.response?.data?.message || 'Logout failed');
    }
}

export const refreshTokenApi = async (): Promise<void> => {
    try {
        const token = getToken();
        if (!token) {
            throw new Error('No token found');
        }
        await axiosInstance.post('/auth/refresh', { token });
    } catch (error: any) {
        console.error('Refresh token failed:', error);
        throw new Error(error.response?.data?.message || 'Refresh token failed');
    }
}
