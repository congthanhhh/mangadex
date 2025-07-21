import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TopManga, JikanTopMangaResponse } from "../../types/jikanType";
import { getTopMangaJikanAPI } from "../../services/jikanService";

// State interface
interface JikanSliceState {
    topMangaList: TopManga[];
    loading: boolean;
    error: string | null;
    currentPage: number;
    hasNextPage: boolean;
}

const initialState: JikanSliceState = {
    topMangaList: [],
    loading: false,
    error: null,
    currentPage: 1,
    hasNextPage: true
};

// Async thunk
export const fetchTopManga = createAsyncThunk(
    'jikan/fetchTopManga',
    async ({ page, pageSize }: { page: number, pageSize: number }) => {
        return await getTopMangaJikanAPI(page, pageSize);
    }
);

const jikanSlice = createSlice({
    name: 'jikan',
    initialState,
    reducers: {
        clearTopManga: (state) => {
            state.topMangaList = [];
            state.currentPage = 1;
            state.hasNextPage = true;
        },
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTopManga.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTopManga.fulfilled, (state, action: PayloadAction<JikanTopMangaResponse>) => {
                state.loading = false;
                state.topMangaList = action.payload.data;
                state.hasNextPage = action.payload.pagination?.has_next_page || false;
            })
            .addCase(fetchTopManga.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch top manga';
            });
    }
});

export const { clearTopManga, setCurrentPage } = jikanSlice.actions;
export default jikanSlice.reducer;