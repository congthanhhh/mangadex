import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getPagesByChapterIdAPI, Page } from "../../services/pageService";

interface PageState {
    pages: Page[];
    loading: boolean;
    error: string | null;
}

const initialState: PageState = {
    pages: [],
    loading: false,
    error: null
};

export const fetchPagesByChapterId = createAsyncThunk(
    "page/fetchPagesByChapterId",
    async (chapterId: number, { rejectWithValue }) => {
        try {
            const response = await getPagesByChapterIdAPI(chapterId.toString());
            return response;
        } catch (error) {
            console.error("Error fetching pages by chapter ID:", error);
            return rejectWithValue("Failed to fetch pages");
        }
    });

export const pageSlice = createSlice({
    name: "page",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPagesByChapterId.fulfilled, (state, action) => {
                state.loading = false;
                state.pages = action.payload;
            })
    }
})

export const { } = pageSlice.actions;
export default pageSlice.reducer;