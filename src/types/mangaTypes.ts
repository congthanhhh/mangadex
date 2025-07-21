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
export interface MangaSliceState {
    mangaList: Manga[];
    mangaListNew: Manga[];
    selectedManga: Manga | null;
    loading: boolean;
    loadingMangaDetail: boolean;
    error: string | null;
    detailError: string | null;
}
