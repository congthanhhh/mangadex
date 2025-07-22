export interface MangaDexManga {
    id: string;
    type: string;
    attributes: {
        title: {
            [key: string]: string;
        };
        description: {
            [key: string]: string;
        };
        status: string;
        year?: number;
        contentRating: string;
        tags: Array<{
            id: string;
            type: string;
            attributes: {
                name: {
                    en: string;
                };
            };
        }>;
        createdAt: string;
        updatedAt: string;
    };
    relationships: Array<{
        id: string;
        type: string;
        attributes?: {
            fileName?: string;
            description?: string;
            volume?: string;
        };
    }>;
}

export interface MangaDexChapter {
    id: string;
    type: string;
    attributes: {
        title?: string;
        volume?: string;
        chapter?: string;
        translatedLanguage: string;
        publishAt: string;
        readableAt: string;
        createdAt: string;
        updatedAt: string;
        pages: number;
    };
    relationships: Array<{
        id: string;
        type: string;
    }>;
}

export interface MangaDexResponse {
    result: string;
    response: string;
    data: MangaDexManga[];
    limit: number;
    offset: number;
    total: number;
}

export interface MangaDexChapterResponse {
    result: string;
    response: string;
    data: MangaDexChapter[];
    limit: number;
    offset: number;
    total: number;
}
