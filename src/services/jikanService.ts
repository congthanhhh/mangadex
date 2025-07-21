import { jikanApi } from "../utils/axiosInstance";
import { JikanTopMangaResponse } from "../types/jikanType";

export const getTopMangaJikanAPI = async (page: number, pageSize: number): Promise<JikanTopMangaResponse> => {
    try {
        const response = await jikanApi.get(`/top/manga?page=${page}&limit=${pageSize}`);
        return response.data;
    } catch (error) {
        console.error('Jikan API Error:', error);
        throw error;
    }
}