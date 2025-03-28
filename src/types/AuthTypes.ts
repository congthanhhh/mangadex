export interface ModelLoginProps {
    isOpenLogin: boolean;
    handleCancel: () => void;
}

export interface Manga {
    id: number;
    title: string;
}

export interface MangaState {
    mangaList: Manga[];
    totalPages: number;
    currentPage: number;
    loading: boolean;
    error: string | null;
}