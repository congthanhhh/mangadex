import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { MangaState } from "../../types/AuthTypes";
import { getMangaListAPI } from "../../services/mangaService";

const initialState: MangaState = {
    mangaList: [],
    totalPages: 0,
    currentPage: 0,
    loading: false,
    error: null,
};


export const fetchManga = createAsyncThunk(
    'manga/fetchManga',
    async ({ page, pageSize }: { page: number; pageSize: number }, thunkAPI) => {
        try {
            const { data, total } = await getMangaListAPI(page, pageSize);
            return { data, total };
        } catch (error: any) {
            return thunkAPI.rejectWithValue('Failed to fetch manga');
        }
    }
);

const mangaSlice = createSlice({
    name: 'manga',
    initialState,
    reducers: {
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchManga.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchManga.fulfilled, (state, action) => {
                state.loading = false;
                state.mangaList = action.payload.data;
                state.totalPages = action.payload.total;
                console.log(">>>>> Check payload:", action.payload);
            })
            .addCase(fetchManga.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { setCurrentPage } = mangaSlice.actions;
export default mangaSlice.reducer;