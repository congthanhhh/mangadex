import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
    user: any | null;
}

const initialState: AuthState = {
    user: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {

    },

});

export default authSlice.reducer;



