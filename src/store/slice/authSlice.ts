import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginApi, authenticateWithGoogle, logoutApi, refreshTokenApi } from "../../services/authService";
import { getToken, removeToken } from "../../utils/tokenUtils";
import { UserInfo, fetchUserInfo } from "../../services/userService";

interface AuthState {
    user: UserInfo | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
    logoutLoading: boolean;
}

const initialState: AuthState = {
    user: null,
    isAuthenticated: !!getToken(), // Check if token exists
    loading: false,
    error: null,
    logoutLoading: false
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

export const logoutAsync = createAsyncThunk(
    'auth/logoutAsync',
    async () => {
        try {
            // Call API to invalidate token on server
            await logoutApi();
            return true;
        } catch (error: any) {
            // Even if API fails, we'll still logout locally
            console.warn('Logout API failed, but will logout locally:', error);
            return true;
        }
    }
);

export const refreshToken = createAsyncThunk(
    'auth/refreshToken',
    async (_, { rejectWithValue }) => {
        try {
            await refreshTokenApi();
            return true;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to refresh token');
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
            })
            // Add cases for logout
            .addCase(logoutAsync.pending, (state) => {
                state.logoutLoading = true;
            })
            .addCase(logoutAsync.fulfilled, (state) => {
                state.logoutLoading = false;
                state.user = null;
                state.isAuthenticated = false;
                state.error = null;
            })
            .addCase(logoutAsync.rejected, (state) => {
                state.logoutLoading = false;
                state.user = null;
                state.isAuthenticated = false;
                state.error = null;
            });
    }
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;




