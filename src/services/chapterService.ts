import axiosInstance from "../utils/axiosInstance"


export interface PageChapterResponse {
    pageNumber: number;
    imageUrls: string[];
}

export interface Chapter {
    chapterNumber: number;
    title: string;
    releaseDate: string;
    summary: string;
    viewCount: number;
    isActive: boolean;
    pages: PageChapterResponse[];
    comicTitle: string;
}

export const getPaginatedChaptersAPI = async (mangaId: string): Promise<Chapter[]> => {
    try {
        const response = await axiosInstance.get(`/chapter/comic/${mangaId}`);
        return response.data.result;
    } catch (error) {
        console.error("Error fetching paginated chapters:", error);
        throw error;
    }
}