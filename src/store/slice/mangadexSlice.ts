import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { MangaDexManga } from "../../types/mangadexType";
import * as mangadexService from "../../services/mangadexService";

// State interface
interface MangaDxState {
    manga: MangaDexManga[];
    currentManga: MangaDexManga | null;
    chapters: any[];
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
const initialState: MangaDxState = {
    manga: [],
    currentManga: null,
    chapters: [],
    loading: false,
    error: null,
    pagination: {
        currentPage: 1,
        total: 0,
        limit: 20,
        offset: 0,
    },
};

// Async thunks
export const fetchLatestManga = createAsyncThunk(
    "mangadex/fetchLatestManga",
    async ({ page, limit }: { page: number; limit: number }) => {
        const offset = (page - 1) * limit;
        const response = await mangadexService.getLatestManga(limit, offset);
        return { response, page, limit };
    }
);

export const fetchMangaById = createAsyncThunk(
    "mangadex/fetchMangaById",
    async (id: string) => {
        const response = await mangadexService.getMangaById(id);
        return response;
    }
);

export const fetchMangaChapters = createAsyncThunk(
    "mangadex/fetchMangaChapters",
    async ({ mangaId, limit, offset }: { mangaId: string; limit: number; offset: number }) => {
        const response = await mangadexService.getMangaChapters(mangaId, limit, offset);
        return response;
    }
);

export const searchManga = createAsyncThunk(
    "mangadex/searchManga",
    async ({ title, page, limit }: { title: string; page: number; limit: number }) => {
        const offset = (page - 1) * limit;
        const response = await mangadexService.searchManga(title, limit, offset);
        return { response, page, limit };
    }
);

// Slice
const mangadexSlice = createSlice({
    name: "mangadex",
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        clearCurrentManga: (state) => {
            state.currentManga = null;
        },
        clearChapters: (state) => {
            state.chapters = [];
        },
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.pagination.currentPage = action.payload;
        },
    },
    extraReducers: (builder) => {
        // Fetch latest manga
        builder
            .addCase(fetchLatestManga.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchLatestManga.fulfilled, (state, action) => {
                state.loading = false;
                state.manga = action.payload.response.data;
                state.pagination = {
                    currentPage: action.payload.page,
                    total: action.payload.response.total,
                    limit: action.payload.limit,
                    offset: (action.payload.page - 1) * action.payload.limit,
                };
            })
            .addCase(fetchLatestManga.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch manga";
            });

        // Fetch manga by ID
        builder
            .addCase(fetchMangaById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMangaById.fulfilled, (state, action) => {
                state.loading = false;
                // Response từ single manga endpoint trả về dạng { data: MangaDexManga }
                state.currentManga = action.payload.data[0] || action.payload.data;
            })
            .addCase(fetchMangaById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch manga";
            });

        // Fetch manga chapters
        builder
            .addCase(fetchMangaChapters.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMangaChapters.fulfilled, (state, action) => {
                state.loading = false;
                state.chapters = action.payload.data;
            })
            .addCase(fetchMangaChapters.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch chapters";
            });

        // Search manga
        builder
            .addCase(searchManga.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(searchManga.fulfilled, (state, action) => {
                state.loading = false;
                state.manga = action.payload.response.data;
                state.pagination = {
                    currentPage: action.payload.page,
                    total: action.payload.response.total,
                    limit: action.payload.limit,
                    offset: (action.payload.page - 1) * action.payload.limit,
                };
            })
            .addCase(searchManga.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to search manga";
            });
    },
});

export const { clearError, clearCurrentManga, clearChapters, setCurrentPage } = mangadexSlice.actions;
export default mangadexSlice.reducer;
