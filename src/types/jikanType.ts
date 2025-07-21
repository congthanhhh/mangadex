// Jikan API response structure
export interface TopManga {
    mal_id: number;
    images: {
        webp: {
            image_url: string;
            small_image_url: string;
            large_image_url: string;
        }
        jpg: {
            image_url: string;
            small_image_url: string;
            large_image_url: string;
        }
    }
    title: string;
    title_english?: string;
    score?: number;
    scored_by?: number;
    rank?: number;
    popularity?: number;
    members?: number;
    favorites?: number;
    synopsis?: string;
    genres?: Array<{
        mal_id: number;
        type: string;
        name: string;
        url: string;
    }>;
    status?: string;
    published?: {
        from: string;
        to?: string;
    };
}

// API Response wrapper
export interface JikanTopMangaResponse {
    data: TopManga[];
    pagination: {
        last_visible_page: number;
        has_next_page: boolean;
        current_page: number;
        items: {
            count: number;
            total: number;
            per_page: number;
        };
    };
}