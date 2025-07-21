import { axiosInstance } from "../utils/axiosInstance";
import { Page } from "../types/pageTypes";

export const getPagesByChapterIdAPI = async (chapterId: string): Promise<Page[]> => {
    try {
        const response = await axiosInstance.get(`/page/chapter/${chapterId}`);
        return response.data.result
    } catch (error) {
        console.error("Error fetching pages by chapter ID:", error);
        throw error;
    }
}