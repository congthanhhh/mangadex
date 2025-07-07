import axiosInstance from "../utils/axiosInstance"
import { RootCommentResponse, RepliesCommentResponse } from "../types/commentTypes"

export const getRootCommentAPI = async (mangaId: string): Promise<RootCommentResponse> => {
    try {
        const response = await axiosInstance.get(`/comment/root/${mangaId}`);
        return response.data.result;
    } catch (error) {
        console.error("Error fetching root comment:", error);
        throw error;
    }
}
export const getRootCommentChapterAPI = async (chapterId: number): Promise<RootCommentResponse> => {
    try {
        const response = await axiosInstance.get(`/comment/root-chapter/${chapterId}`);
        return response.data.result;
    } catch (error) {
        console.error("Error fetching root comment:", error);
        throw error;
    }
}
export const getRepliesCommentAPI = async (commentId: number): Promise<RepliesCommentResponse> => {
    try {
        const response = await axiosInstance.get(`/comment/replies/${commentId}`);
        return response.data.result;
    } catch (error) {
        console.error("Error fetching root comment:", error);
        throw error;
    }
}