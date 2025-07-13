import axiosInstance from "../utils/axiosInstance"
import { RootCommentResponse, RepliesCommentResponse, PostCommentRequest } from "../types/commentTypes"
import { getToken } from "../utils/tokenUtils";

export const getRootCommentAPI = async (mangaId: string): Promise<RootCommentResponse> => {
    try {
        const response = await axiosInstance.get(`/comment/root/${mangaId}`);
        return response.data.result;
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || error.message;
        throw new Error(errorMessage);
    }
}
export const getRootCommentChapterAPI = async (chapterId: number): Promise<RootCommentResponse> => {
    try {
        const response = await axiosInstance.get(`/comment/root-chapter/${chapterId}`);
        return response.data.result;
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || error.message;
        throw new Error(errorMessage);
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


export const postCommentAPI = async (data: PostCommentRequest): Promise<any> => {
    const token = getToken();
    if (!token) {
        console.log("User not authenticated");
        throw new Error("Cần đăng nhập để thực hiện hành động này");
    }
    try {
        const response = await axiosInstance.post('/comment', data);
        return response.data.result;
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || error.message;
        console.log("Error posting comment:", error);
        throw new Error(errorMessage);
    }
}