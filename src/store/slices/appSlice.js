import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
    name: 'app',
    initialState: {
        loading: false,
        error: null
    },
    reducers: {
        toggleLoading: (state, { payload: loading }) => {
            state.loading = loading
        },
        setError: (state, { payload: error }) => {
            state.error = error
        },
    }
})

export const { toggleLoading, setError } = appSlice.actions

export default appSlice.reducer