import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { getRootCommentAPI, getRepliesCommentAPI } from '../../services/commentService'
import { IRootComment, IRePlyComment, CommentState } from '../../types/commentTypes'

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
            return response.result || response;
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch root comments');
        }
    }
)

export const fetchRepliesForComment = createAsyncThunk(
    'comment/fetchRepliesForComment',
    async (commentId: number, { rejectWithValue }) => {
        try {
            const response = await getRepliesCommentAPI(commentId);
            return {
                commentId,
                replies: response.result || response
            };
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch replies');
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
                        replies: Array.isArray(response.result || response) ? (response.result || response) : []
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
        setRepliesForComment: (state, action: PayloadAction<{ commentId: number; replies: IRePlyComment[] }>) => {
            const { commentId, replies } = action.payload;
            state.replies[commentId] = replies;
        }
    },
    extraReducers: (builder) => {
        builder

            .addCase(fetchRootComments.fulfilled, (state, action) => {
                state.loading = false;
                state.rootComments = Array.isArray(action.payload) ? action.payload : [];
            })

            .addCase(fetchRepliesForComment.fulfilled, (state, action) => {
                state.loading = false;
                const { commentId, replies } = action.payload;
                state.replies[commentId] = Array.isArray(replies) ? replies : [];
            })

            .addCase(fetchAllRepliesForComments.fulfilled, (state, action) => {
                state.loading = false;
                action.payload.forEach(({ commentId, replies }) => {
                    state.replies[commentId] = Array.isArray(replies) ? replies : [];
                });
            })
    },
})

export const { clearComments, setRepliesForComment } = commentSlice.actions
export default commentSlice.reducer
