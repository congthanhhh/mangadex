import { LoginData, LoginResponse } from "../types/AuthTypes";
import axiosInstance from "../utils/axiosInstance";


export const loginAPI = async (data: LoginData): Promise<LoginResponse> => {
    const response = await axiosInstance.post<LoginResponse>('/auth/token', data);
    return response.data;
};