// Common/shared types
export interface PaginationMangaProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export interface ModelSearchProps {
    isOpen: boolean;
    onClose: () => void;
    onSearch: (query: string) => void;
}

// API Response wrapper
export interface ApiResponse<T> {
    code: number;
    result: T;
    message?: string;
}
