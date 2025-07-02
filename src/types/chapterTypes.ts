// Chapter related types
export interface Chapter {
    id: number;
    chapterNumber: number;
    title: string;
    releaseDate: string;
    summary: string;
    viewCount: number;
    isActive: boolean;
    pages: PageChapterResponse[];
    comicTitle: string;
}

export interface IChapter {
    id: string;
    chapterNumber: number;
    // Add other chapter properties as needed
}

// API Response types
export interface PageChapterResponse {
    pageNumber: number;
    imageUrls: string[];
}

// Reading History types
export interface ReadingHistory {
    id: number;
    userId: string;
    chapterId: number;
    chapterTitle: string;
    startDate: string;
    lastReadPageNumber: number;
    lastViewDate: string;
}

// Redux State types
export interface ChapterState {
    chapters: Chapter[];
    selectedChapter: Chapter | null;
    loading: boolean;
    error: string | null;
}

// Component Props types
export interface ModelSelectChapProps {
    // Define based on your component props
    chapters: IChapter[];
    onSelect: (chapter: IChapter) => void;
}
