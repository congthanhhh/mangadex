import axiosInstance from "../utils/axiosInstance"


export interface PageChapterResponse {
    pageNumber: number;
    imageUrls: string[];
}

export interface Chapter {
    id: number;
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

export interface ReadingHistory {
    id: number;
    userId: string;
    chapterId: number;
    chapterTitle: string;
    startDate: string;
    lastReadPageNumber: number;
    lastViewDate: string;
}

export const getReadingHistoryAPI = async (chapterId: number): Promise<ReadingHistory[]> => {
    try {
        const response = await axiosInstance.post(`/chapter/reading-history/${chapterId}`);
        return response.data.result;
    } catch (error) {
        console.error("Error fetching reading history:", error);
        throw error;
    }
}

export const increaseViewCountAPI = async (chapterId: number): Promise<void> => {
    try {
        await axiosInstance.post(`/chapter/increase-view/${chapterId}`);
    } catch (error) {
        console.error("Error increasing view count:", error);
        throw error;
    }
}