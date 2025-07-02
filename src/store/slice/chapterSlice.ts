import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { ReadingHistory, getPaginatedChaptersAPI, getTop2ChaptersAPI, increaseViewCountAPI } from '../../services/chapterService';
import { Chapter } from '../../types';

interface ChapterState {
    chapters: Chapter[];
    chaptersByMangaId: Record<string, Chapter[]>;
    currentChapter: Chapter | null;
    readingHistory: ReadingHistory[];
    loading: boolean;
    error: string | null;
}

const initialState: ChapterState = {
    chapters: [],
    chaptersByMangaId: {},
    currentChapter: null,
    readingHistory: [],
    loading: false,
    error: null
};

export const fetchChaptersByMangaId = createAsyncThunk(
    'chapter/fetchByMangaId',
    async (mangaId: string, { rejectWithValue }) => {
        try {
            const response = await getPaginatedChaptersAPI(mangaId);
            return { mangaId, chapters: response };
        } catch (error) {
            return rejectWithValue('Failed to fetch chapters');
        }
    }
);
export const fetchTop2ChaptersByMangaId = createAsyncThunk(
    'top2Chapter/fetchByMangaId',
    async (mangaId: string, { rejectWithValue }) => {
        try {
            const response = await getTop2ChaptersAPI(mangaId);
            return { mangaId, chapters: response };
        } catch (error) {
            return rejectWithValue('Failed to fetch chapters');
        }
    }
);

export const increaseViewCount = createAsyncThunk(
    'chapter/increaseViewCount',
    async (chapterId: number, { rejectWithValue }) => {
        try {
            await increaseViewCountAPI(chapterId);
            return chapterId;
        } catch (error) {
            return rejectWithValue('Failed to increase view count');
        }
    }
);

const chapterSlice = createSlice({
    name: 'chapter',
    initialState, reducers: {
        clearChapters: (state) => {
            state.chapters = [];
            state.chaptersByMangaId = {};
            state.currentChapter = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchChaptersByMangaId.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchChaptersByMangaId.fulfilled, (state, action: PayloadAction<{ mangaId: string, chapters: Chapter[] }>) => {
                state.loading = false;
                state.chapters = action.payload.chapters;
                state.chaptersByMangaId[action.payload.mangaId] = action.payload.chapters;
            })
            .addCase(fetchChaptersByMangaId.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(fetchTop2ChaptersByMangaId.fulfilled, (state, action: PayloadAction<{ mangaId: string, chapters: Chapter[] }>) => {
                state.loading = false;
                state.chaptersByMangaId[action.payload.mangaId] = action.payload.chapters;
            })
    }
});

export const { clearChapters } = chapterSlice.actions;
export default chapterSlice.reducer;