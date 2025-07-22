import { MangaDexResponse } from "../types/mangadexType";
import { mangadex } from "../utils/axiosInstance"

export const getLatestManga = async (
    limit: number,
    offset: number
): Promise<MangaDexResponse> => {
    try {
        const response = await mangadex.get("/manga", {
            params: {
                limit,
                offset,
                order: {
                    createdAt: "desc"
                },
                includes: ["cover_art", "author", "artist"],
                contentRating: ["safe", "suggestive"],
                status: ["ongoing", "completed"],
                publicationDemographic: ["shounen", "seinen", "shoujo", "josei"],
                originalLanguage: ["ko", "zh"]
            }
        });

        return response.data;
    } catch (error) {
        console.error("Error fetching latest manga:", error);
        throw error;
    }
};

// Lấy manga theo ID
export const getMangaById = async (id: string): Promise<MangaDexResponse> => {
    try {
        const response = await mangadex.get(`/manga/${id}`, {
            params: {
                includes: ["cover_art", "author", "artist"]
            }
        });

        return response.data;
    } catch (error) {
        console.error("Error fetching manga by ID:", error);
        throw error;
    }
};

// Lấy chapters của manga
export const getMangaChapters = async (
    mangaId: string,
    limit: number = 50,
    offset: number = 0
): Promise<MangaDexResponse> => {
    try {
        const response = await mangadex.get(`/manga/${mangaId}/feed`, {
            params: {
                limit,
                offset,
                order: {
                    chapter: "asc"
                },
                translatedLanguage: ["en"]
            }
        });

        return response.data;
    } catch (error) {
        console.error("Error fetching manga chapters:", error);
        throw error;
    }
};

// Tìm kiếm manga
export const searchManga = async (
    title: string,
    limit: number = 20,
    offset: number = 0
): Promise<MangaDexResponse> => {
    try {
        const response = await mangadex.get("/manga", {
            params: {
                title,
                limit,
                offset,
                includes: ["cover_art", "author", "artist"],
                contentRating: ["safe", "suggestive"]
            }
        });

        return response.data;
    } catch (error) {
        console.error("Error searching manga:", error);
        throw error;
    }
};

// Lấy URL cover image
export const getCoverImageUrl = (
    mangaId: string,
    coverFileName: string,
    size: "256" | "512" = "256"
): string => {
    return `https://uploads.mangadex.org/covers/${mangaId}/${coverFileName}.${size}.jpg`;
};