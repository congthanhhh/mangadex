import axiosInstance from "../utils/axiosInstance";

export interface Page {
    titleComic: string;
    chapterNumber: number;
    pageNumber: number;
    imageUrl: string;
}

export const getPagesByChapterIdAPI = async (chapterId: string): Promise<Page[]> => {
    try {
        const response = await axiosInstance.get(`/page/chapter/${chapterId}`);
        return response.data.result
    } catch (error) {
        console.error("Error fetching pages by chapter ID:", error);
        throw error;
    }
}