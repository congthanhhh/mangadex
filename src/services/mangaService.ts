
import { MangaResponse, Manga } from "../types/mangaTypes"
import { axiosInstance } from "../utils/axiosInstance";

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

export const getMangaByViewCountAPI = async (page: number, pageSize: number): Promise<MangaResponse> => {
    try {
        const response = await axiosInstance.get(`/manga/by-view-count?page=${page}&pageSize=${pageSize}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching manga by view count:", error);
        throw error;
    }
}

export const searchMangaAPI = async (title: string): Promise<{ code: number; result: Manga[] }> => {
    try {
        const response = await axiosInstance.get(`/manga/search?title=${encodeURIComponent(title)}`);
        return response.data;
    } catch (error) {
        console.error("Error searching manga:", error);
        throw error;
    }
}

