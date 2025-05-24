import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Manga, MangaResponse, getPaginatedMangaAPI, getMangaByIdAPI, getMangaNewAPI } from '../../services/mangaService';

interface MangaState {
    mangaList: Manga[];
    mangaListNew: Manga[];
    selectedManga: Manga | null;
    loading: boolean;
    loadingMangaDetail: boolean;
    error: string | null;
    detailError: string | null;
}
const initialState: MangaState = {
    mangaList: [],
    mangaListNew: [],
    selectedManga: null,
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
            const response = await getMangaNewAPI(apiPage, pageSize);
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
        clearSelectedManga: (state) => {
            state.selectedManga = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPaginatedManga.pending, (state) => {
                state.loading = true;
                state.error = null;
            }).addCase(fetchPaginatedManga.fulfilled, (state, action: PayloadAction<MangaResponse>) => {
                state.loading = false;
                state.mangaList = action.payload.result.content;
            })
            .addCase(fetchPaginatedManga.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(fetchMangaById.fulfilled, (state, action: PayloadAction<Manga>) => {
                state.loadingMangaDetail = false;
                state.selectedManga = action.payload;
            }).addCase(fetchMangaNew.fulfilled, (state, action: PayloadAction<MangaResponse>) => {
                state.loading = false;
                state.mangaListNew = action.payload.result.content;
            });
    }
});

export const { clearSelectedManga } = mangaSlice.actions;
export default mangaSlice.reducer;