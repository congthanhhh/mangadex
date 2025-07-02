// Page related types
export interface Page {
    titleComic: string;
    chapterNumber: number;
    pageNumber: number;
    imageUrl: string;
}

// Redux State types
export interface PageState {
    pages: Page[];
    currentPage: number;
    loading: boolean;
    error: string | null;
}
