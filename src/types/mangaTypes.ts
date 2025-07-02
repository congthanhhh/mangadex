// Manga related types
export interface Manga {
    id: string;
    title: string;
    imageUrl: string;
    status: string;
    description: string;
    viewCount: number;
    ageRating: string | null;
    genres: GenreResponse[];
    isActive: boolean;
    totalChapters: number;
}

export interface GenreResponse {
    id: number;
    name: string;
}

// API Response types
export interface MangaResponse {
    code: number;
    result: {
        content: Manga[];
        totalPages: number;
        totalElements: number;
        currentPage: number;
        pageSize: number;
    };
}

// Redux State types
export interface MangaState {
    mangas: Manga[];
    selectedManga: Manga | null;
    loading: boolean;
    error: string | null;
    totalPages: number;
    currentPage: number;
}

// Component Props types
export interface IManga {
    id: string;
    title: string;
    // Add other manga properties as needed
}
