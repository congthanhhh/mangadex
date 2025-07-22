import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { MangaDexChapter } from "../../types/mangadexType";
import * as chapterdexService from "../../services/chapterdexService";

// State interface
interface ChapterDexState {
    chapters: MangaDexChapter[];
    currentChapter: MangaDexChapter | null;
    chapterPages: any[];
    chaptersByMangaId: { [mangaId: string]: MangaDexChapter[] };
    loading: boolean;
    error: string | null;
    pagination: {
        currentPage: number;
        total: number;
        limit: number;
        offset: number;
    };
}

// Initial state
const initialState: ChapterDexState = {
    chapters: [],
    currentChapter: null,
    chapterPages: [],
    chaptersByMangaId: {},
    loading: false,
    error: null,
    pagination: {
        currentPage: 1,
        total: 0,
        limit: 50,
        offset: 0,
    },
};

// Async thunks
export const fetchMangaChaptersDex = createAsyncThunk(
    "chapterdex/fetchMangaChapters",
    async ({ mangaId, limit, offset }: { mangaId: string; limit: number; offset: number }) => {
        const response = await chapterdexService.getMangaChaptersDex(mangaId, limit, offset);
        return { response, mangaId };
    }
);

export const fetchChapterByIdDex = createAsyncThunk(
    "chapterdex/fetchChapterById",
    async (chapterId: string) => {
        const response = await chapterdexService.getChapterByIdDex(chapterId);
        return response;
    }
);

export const fetchChapterPagesDex = createAsyncThunk(
    "chapterdex/fetchChapterPages",
    async (chapterId: string) => {
        const response = await chapterdexService.getChapterPagesDex(chapterId);
        return response;
    }
);

export const fetchTop2ChaptersByMangaIdDex = createAsyncThunk(
    "chapterdex/fetchTop2ChaptersByMangaId",
    async (mangaId: string) => {
        const response = await chapterdexService.getTop2ChaptersByMangaIdDex(mangaId);
        return { response, mangaId };
    }
);

export const searchChaptersDex = createAsyncThunk(
    "chapterdex/searchChapters",
    async ({
        mangaId,
        chapterNumber,
        limit,
        offset
    }: {
        mangaId: string;
        chapterNumber?: string;
        limit: number;
        offset: number;
    }) => {
        const response = await chapterdexService.searchChaptersDex(mangaId, chapterNumber, limit, offset);
        return { response, mangaId };
    }
);

// Slice
const chapterdexSlice = createSlice({
    name: "chapterdex",
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        clearCurrentChapter: (state) => {
            state.currentChapter = null;
        },
        clearChapterPages: (state) => {
            state.chapterPages = [];
        },
        clearChaptersByMangaId: (state, action: PayloadAction<string>) => {
            delete state.chaptersByMangaId[action.payload];
        },
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.pagination.currentPage = action.payload;
        },
    },
    extraReducers: (builder) => {
        // Fetch manga chapters
        builder
            .addCase(fetchMangaChaptersDex.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMangaChaptersDex.fulfilled, (state, action) => {
                state.loading = false;
                state.chapters = action.payload.response.data;
                state.chaptersByMangaId[action.payload.mangaId] = action.payload.response.data;
                state.pagination.total = action.payload.response.total;
            })
            .addCase(fetchMangaChaptersDex.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch chapters";
            });

        // Fetch chapter by ID
        builder
            .addCase(fetchChapterByIdDex.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchChapterByIdDex.fulfilled, (state, action) => {
                state.loading = false;
                // Single chapter endpoint trả về data array, lấy phần tử đầu tiên
                state.currentChapter = Array.isArray(action.payload.data)
                    ? action.payload.data[0] as any
                    : action.payload.data as any;
            })
            .addCase(fetchChapterByIdDex.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch chapter";
            });

        // Fetch chapter pages
        builder
            .addCase(fetchChapterPagesDex.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchChapterPagesDex.fulfilled, (state, action) => {
                state.loading = false;
                state.chapterPages = action.payload.chapter?.data || [];
            })
            .addCase(fetchChapterPagesDex.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch chapter pages";
            });

        // Fetch top 2 chapters by manga ID
        builder
            .addCase(fetchTop2ChaptersByMangaIdDex.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTop2ChaptersByMangaIdDex.fulfilled, (state, action) => {
                state.loading = false;
                const chapters = action.payload.response.data.slice(0, 2);
                state.chaptersByMangaId[action.payload.mangaId] = chapters;
            })
            .addCase(fetchTop2ChaptersByMangaIdDex.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch top chapters";
            });

        // Search chapters
        builder
            .addCase(searchChaptersDex.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(searchChaptersDex.fulfilled, (state, action) => {
                state.loading = false;
                state.chapters = action.payload.response.data;
                state.pagination.total = action.payload.response.total;
            })
            .addCase(searchChaptersDex.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to search chapters";
            });
    },
});

export const {
    clearError,
    clearCurrentChapter,
    clearChapterPages,
    clearChaptersByMangaId,
    setCurrentPage
} = chapterdexSlice.actions;

export default chapterdexSlice.reducer;
