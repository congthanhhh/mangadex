import { axiosInstance } from "../utils/axiosInstance";

export interface UserInfo {
    id: number;
    username: string;
    email: string;
    displayName?: string;
    avatarUrl?: string;
    role?: string;
    noPassword?: boolean;
    createdAt?: string;
    updatedAt?: string;
}

export const fetchUserInfo = async (): Promise<UserInfo | null> => {
    try {
        const response = await axiosInstance.get('/users/my-info');

        if (response.data && response.data.result) {
            return response.data.result;
        }

        return null;
    } catch (error) {
        console.error('Error fetching user info:', error);
        return null;
    }
};