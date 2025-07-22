import { MangaDexResponse, MangaDexChapterResponse } from "../types/mangadexType";
import { mangadex } from "../utils/axiosInstance";

// Lấy chapters của manga theo ID
export const getMangaChaptersDex = async (
    mangaId: string,
    limit: number = 50,
    offset: number = 0
): Promise<MangaDexChapterResponse> => {
    try {
        const response = await mangadex.get(`/manga/${mangaId}/feed`, {
            params: {
                limit,
                offset,
                order: {
                    chapter: "asc"
                },
                translatedLanguage: ["en"],
                includes: ["scanlation_group", "user"]
            }
        });

        return response.data;
    } catch (error) {
        console.error("Error fetching manga chapters:", error);
        throw error;
    }
};

// Lấy chapter theo ID
export const getChapterByIdDex = async (chapterId: string): Promise<MangaDexResponse> => {
    try {
        const response = await mangadex.get(`/chapter/${chapterId}`, {
            params: {
                includes: ["manga", "scanlation_group", "user"]
            }
        });

        return response.data;
    } catch (error) {
        console.error("Error fetching chapter by ID:", error);
        throw error;
    }
};

// Lấy pages của chapter (at-home server)
export const getChapterPagesDex = async (chapterId: string): Promise<any> => {
    try {
        const response = await mangadex.get(`/at-home/server/${chapterId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching chapter pages:", error);
        throw error;
    }
};

// Lấy top 2 chapters mới nhất của manga
export const getTop2ChaptersByMangaIdDex = async (mangaId: string): Promise<MangaDexChapterResponse> => {
    try {
        const response = await mangadex.get(`/manga/${mangaId}/feed`, {
            params: {
                limit: 2,
                offset: 0,
                order: {
                    publishAt: "desc"
                },
                translatedLanguage: ["en"],
                includes: ["scanlation_group"]
            }
        });

        return response.data;
    } catch (error) {
        console.error("Error fetching top 2 chapters:", error);
        throw error;
    }
};

// Tìm kiếm chapters
export const searchChaptersDex = async (
    mangaId: string,
    chapterNumber?: string,
    limit: number = 20,
    offset: number = 0
): Promise<MangaDexChapterResponse> => {
    try {
        const params: any = {
            manga: mangaId,
            limit,
            offset,
            order: {
                chapter: "asc"
            },
            translatedLanguage: ["en"],
            includes: ["scanlation_group", "user"]
        };

        if (chapterNumber) {
            params.chapter = chapterNumber;
        }

        const response = await mangadex.get("/chapter", {
            params
        });

        return response.data;
    } catch (error) {
        console.error("Error searching chapters:", error);
        throw error;
    }
};
