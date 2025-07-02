import axiosInstance from "../utils/axiosInstance"
import { MangaResponse, Manga } from "../types/mangaTypes"

// Fetch paginated manga
export const getPaginatedMangaAPI = async (page: number, pageSize: number): Promise<MangaResponse> => {
    try {
        const response = await axiosInstance.get(`/manga/paginated?page=${page}&pageSize=${pageSize}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching paginated manga:", error);
        throw error;
    }
}

export const getMangaByIdAPI = async (mangaId: string): Promise<Manga> => {
    try {
        const response = await axiosInstance.get(`/manga/${mangaId}`);
        return response.data.result;
    } catch (error) {
        console.error("Error fetching manga by ID:", error);
        throw error;
    }
}

export const getMangaNewAPI = async (page: number, pageSize: number): Promise<MangaResponse> => {
    try {
        const response = await axiosInstance.get(`/manga/paginated/new?page=${page}&pageSize=${pageSize}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching new manga:", error);
        throw error;
    }
}
