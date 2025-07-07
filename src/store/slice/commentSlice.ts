import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getRootCommentAPI, getRepliesCommentAPI, getRootCommentChapterAPI } from '../../services/commentService'
import { IRootComment, CommentState } from '../../types/commentTypes'

const initialState: CommentState = {
    rootComments: [],
    replies: {},
    loading: false,
    error: null,
}

// Async thunks
export const fetchRootComments = createAsyncThunk(
    'comment/fetchRootComments',
    async (mangaId: string, { rejectWithValue }) => {
        try {
            const response = await getRootCommentAPI(mangaId);
            return response;
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch root comments');
        }
    }
)

export const fetchRootCommentChapter = createAsyncThunk(
    'comment/fetchRootCommentChapter',
    async (chapterId: number, { rejectWithValue }) => {
        try {
            const response = await getRootCommentChapterAPI(chapterId);
            return response;
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch root comments');
        }
    }
)

export const fetchAllRepliesForComments = createAsyncThunk(
    'comment/fetchAllRepliesForComments',
    async (rootComments: IRootComment[], { rejectWithValue }) => {
        try {
            const repliesPromises = rootComments.map(async (rootComment) => {
                try {
                    const response = await getRepliesCommentAPI(rootComment.commentId);
                    return {
                        commentId: rootComment.commentId,
                        replies: Array.isArray(response) ? (response) : []
                    };
                } catch (error) {
                    console.error(`Error fetching replies for comment ${rootComment.commentId}:`, error);
                    return {
                        commentId: rootComment.commentId,
                        replies: []
                    };
                }
            });

            const allReplies = await Promise.all(repliesPromises);
            return allReplies;
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch replies');
        }
    }
)

const commentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {
        clearComments: (state) => {
            state.rootComments = [];
            state.replies = {};
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRootComments.fulfilled, (state, action) => {
                state.loading = false;
                state.rootComments = Array.isArray(action.payload) ? action.payload : [];
            })
            .addCase(fetchRootCommentChapter.fulfilled, (state, action) => {
                state.loading = false;
                state.rootComments = Array.isArray(action.payload) ? action.payload : [];
            })

            .addCase(fetchAllRepliesForComments.fulfilled, (state, action) => {
                state.loading = false;
                action.payload.forEach(({ commentId, replies }) => {
                    state.replies[commentId] = Array.isArray(replies) ? replies : [];
                });
            })
    },
})

export const { clearComments } = commentSlice.actions
export default commentSlice.reducer
