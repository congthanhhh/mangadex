
import axiosInstance from "../utils/axiosInstance";
import { setToken } from "../utils/tokenUtils";

interface LoginRequest {
    username: string;
    password: string;
}

interface LoginResponse {
    code: number;
    result: {
        token: string;
    };
    message?: string;
}

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
