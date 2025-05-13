import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Manga, MangaResponse, getPaginatedMangaAPI, getMangaByIdAPI } from '../../services/mangaService';

interface MangaState {
    mangaList: Manga[];
    selectedManga: Manga | null;
    totalPages: number;
    totalElements: number;
    currentPage: number;
    // pageSize: number;
    loading: boolean;
    loadingMangaDetail: boolean;
    error: string | null;
    detailError: string | null;
}
const initialState: MangaState = {
    mangaList: [],
    selectedManga: null,
    totalPages: 0,
    totalElements: 0,
    currentPage: 1,
    // pageSize: PAGE_SIZE,
    loading: false,
    loadingMangaDetail: false,
    error: null,
    detailError: null
};

export const fetchPaginatedManga = createAsyncThunk(
    'manga/fetchPaginated',
    async ({ page, pageSize }: { page: number, pageSize: number }, { rejectWithValue }) => {
        try {
            const apiPage = page - 1;
            const response = await getPaginatedMangaAPI(apiPage, pageSize);
            return response;
        } catch (error) {
            return rejectWithValue('Failed to fetch manga');
        }
    }
);

export const fetchMangaNew = createAsyncThunk(
    'manga/fetchNew',
    async ({ page, pageSize }: { page: number, pageSize: number }, { rejectWithValue }) => {
        try {
            const apiPage = page - 1;
            const response = await getPaginatedMangaAPI(apiPage, pageSize);
            return response;
        } catch (error) {
            return rejectWithValue('Failed to fetch new manga');
        }
    });

export const fetchMangaById = createAsyncThunk(
    'manga/fetchById',
    async (mangaId: string, { rejectWithValue }) => {
        try {
            const response = await getMangaByIdAPI(mangaId);
            return response;
        } catch (error) {
            return rejectWithValue('Failed to fetch manga details');
        }
    }
);

const mangaSlice = createSlice({
    name: 'manga',
    initialState,
    reducers: {
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload;
        },
        clearSelectedManga: (state) => {
            state.selectedManga = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPaginatedManga.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPaginatedManga.fulfilled, (state, action: PayloadAction<MangaResponse>) => {
                state.loading = false;
                state.mangaList = action.payload.result.content;
                state.totalPages = action.payload.result.totalPages;
                state.totalElements = action.payload.result.totalElements;
                state.currentPage = action.payload.result.currentPage + 1;
                // state.pageSize = action.payload.result.pageSize;
            })
            .addCase(fetchPaginatedManga.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(fetchMangaById.pending, (state) => {
                state.loadingMangaDetail = true;
                state.detailError = null;
            })
            .addCase(fetchMangaById.fulfilled, (state, action: PayloadAction<Manga>) => {
                state.loadingMangaDetail = false;
                state.selectedManga = action.payload;
            })
            .addCase(fetchMangaById.rejected, (state, action) => {
                state.loadingMangaDetail = false;
                state.detailError = action.payload as string;
            })
            .addCase(fetchMangaNew.fulfilled, (state, action: PayloadAction<MangaResponse>) => {
                state.loading = false;
                state.mangaList = action.payload.result.content;
                state.totalPages = action.payload.result.totalPages;
                state.totalElements = action.payload.result.totalElements;
                state.currentPage = action.payload.result.currentPage + 1;
            });
    }
});

export const { setCurrentPage, clearSelectedManga } = mangaSlice.actions;
export default mangaSlice.reducer;