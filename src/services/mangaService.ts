import axiosInstance from "../utils/axiosInstance"

// Interface for manga response
export interface MangaResponse {
    code: number;
    result: {
        content: Manga[];
        totalPages: number;
        totalElements: number;
        currentPage: number;
        pageSize: number;
    };
}

export interface Manga {
    id: string;
    title: string;
    imageUrl: string;
    status: string;
    description: string;
    viewCount: number;
    ageRating: string | null;
    genres: string[];
    isActive: boolean;
}

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
