import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Chapter, ReadingHistory, getPaginatedChaptersAPI, getReadingHistoryAPI, increaseViewCountAPI } from '../../services/chapterService';

interface ChapterState {
    chapters: Chapter[];
    currentChapter: Chapter | null;
    readingHistory: ReadingHistory[];
    loading: boolean;
    error: string | null;
}

const initialState: ChapterState = {
    chapters: [],
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
            return response;
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
        setCurrentChapter: (state, action: PayloadAction<Chapter>) => {
            state.currentChapter = action.payload;
        },
        clearChapters: (state) => {
            state.chapters = [];
            state.currentChapter = null;
        },
        clearReadingHistory: (state) => {
            state.readingHistory = [];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchChaptersByMangaId.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchChaptersByMangaId.fulfilled, (state, action: PayloadAction<Chapter[]>) => {
                state.loading = false;
                state.chapters = action.payload;
                if (action.payload.length > 0 && !state.currentChapter) {
                    state.currentChapter = action.payload[0];
                }
            })
            .addCase(fetchChaptersByMangaId.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(increaseViewCount.fulfilled, () => {
                // We don't need to update any state here as this just increments the view count on the server
            })
    }
});

export const { setCurrentChapter, clearChapters, clearReadingHistory } = chapterSlice.actions;
export default chapterSlice.reducer;