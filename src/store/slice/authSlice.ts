import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginApi, authenticateWithGoogle } from "../../services/authService";
import { getToken, removeToken } from "../../utils/tokenUtils";
import { UserInfo, fetchUserInfo } from "../../services/userService";

interface AuthState {
    user: UserInfo | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    isAuthenticated: !!getToken(), // Check if token exists
    loading: false,
    error: null
};

export const login = createAsyncThunk(
    'auth/login',
    async (credentials: { username: string; password: string }, { rejectWithValue }) => {
        try {
            const response = await loginApi(credentials);
            if (response.success) {
                return true;
            } else {
                return rejectWithValue(response.message || 'Login failed');
            }
        } catch (error: any) {
            return rejectWithValue(error.message || 'Login failed');
        }
    }
);

export const googleAuthenticate = createAsyncThunk(
    'auth/googleAuthenticate',
    async (authCode: string, { rejectWithValue }) => {
        try {
            const response = await authenticateWithGoogle(authCode);
            if (response.success) {
                return true;
            } else {
                return rejectWithValue(response.message || 'Google authentication failed');
            }
        } catch (error: any) {
            return rejectWithValue(error.message || 'Google authentication failed');
        }
    }
);

export const getUserInfo = createAsyncThunk(
    'auth/getUserInfo',
    async (_, { rejectWithValue }) => {
        try {
            const user = await fetchUserInfo();
            if (user) {
                return user;
            } else {
                return rejectWithValue('Failed to fetch user information');
            }
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to fetch user information');
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            removeToken();
        },
        clearError: (state) => {
            state.error = null;
        }
    }, extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            }).addCase(login.fulfilled, (state) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.error = null;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Add cases for Google authentication
            .addCase(googleAuthenticate.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(googleAuthenticate.fulfilled, (state) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.error = null;
            })
            .addCase(googleAuthenticate.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Add cases for fetching user info
            .addCase(getUserInfo.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserInfo.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.error = null;
            })
            .addCase(getUserInfo.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    }
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;




