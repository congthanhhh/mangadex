import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Manga, MangaResponse, getPaginatedManga } from '../../services/mangaService';

// State interface for manga
interface MangaState {
    mangaList: Manga[];
    totalPages: number;
    totalElements: number;
    currentPage: number;
    pageSize: number;
    loading: boolean;
    error: string | null;
}

const initialState: MangaState = {
    mangaList: [],
    totalPages: 0,
    totalElements: 0,
    currentPage: 1,
    pageSize: 2,
    loading: false,
    error: null
};

export const fetchPaginatedManga = createAsyncThunk(
    'manga/fetchPaginated',
    async ({ page, pageSize }: { page: number, pageSize: number }, { rejectWithValue }) => {
        try {
            const apiPage = page - 1;
            const response = await getPaginatedManga(apiPage, pageSize);
            return response;
        } catch (error) {
            return rejectWithValue('Failed to fetch manga');
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
                state.pageSize = action.payload.result.pageSize;
            })
            .addCase(fetchPaginatedManga.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    }
});

export const { setCurrentPage } = mangaSlice.actions;
export default mangaSlice.reducer;