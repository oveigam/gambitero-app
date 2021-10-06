import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setUserData, setError } from "./userSlice";
import axios from "axios";

export const signUp = createAsyncThunk(
    'auth/signUp',
    async ({ username, email, password }, { dispatch, rejectWithValue }) => {
        try {
            const { data: { token, refreshToken, userData } } = await axios.post('/users/signup', { username, email, password })

            // Guardamos en memoria los token de autenticacion
            await AsyncStorage.setItem('token', token)
            await AsyncStorage.setItem('refreshToken', refreshToken)

            // Enviamos la info del usuario al reducer de user
            dispatch(setUserData(userData))

            return { token, refreshToken }
        } catch (error) {
            dispatch(setError(error.response.data))
            return rejectWithValue(error.response.data)
        }
    }
)

export const login = createAsyncThunk(
    'auth/login',
    async ({ usernameOrEmail, password }, { dispatch, rejectWithValue }) => {
        try {
            const { data: { token, refreshToken, userData } } = await axios.post('/users/login', { usernameOrEmail, password })

            // Guardamos en memoria los token de autenticacion
            await AsyncStorage.setItem('token', token)
            await AsyncStorage.setItem('refreshToken', refreshToken)

            // Enviamos la info del usuario al reducer de user
            dispatch(setUserData(userData))

            return { token, refreshToken }
        } catch (error) {
            dispatch(setError(error.response.data))
            return rejectWithValue(error.response.data)
        }
    }
)

export const logout = createAsyncThunk(
    'auth/logout',
    async (payload, { dispatch, rejectWithValue }) => {
        try {
            AsyncStorage.multiRemove(['token', 'refreshToken'])
            const { data } = await axios.delete('/users/logout')
            return data
        } catch (error) {
            dispatch(setError(error.response.data))
            return rejectWithValue(error.response.data)
        }
    }
)

export const refreshLogin = createAsyncThunk(
    'auth/refreshLogin',
    async ({ refreshToken }, { dispatch }) => {
        try {
            const { data: { userData, token } } = await axios.post('/users/refreshLogin', { refreshToken })

            // Guardamos en memoria el token de autenticacion
            await AsyncStorage.setItem('token', token)

            // Enviamos la info del usuario al reducer de user
            dispatch(setUserData(userData))

            return { token, refreshToken }
        } catch (error) {
            return { token: '', refreshToken: '' }
        }
    }
)

export const refreshAuthToken = createAsyncThunk(
    'auth/refreshAuthToken',
    async ({ refreshToken }) => {
        try {
            const { data: { token } } = await axios.post('/users/refresh', { refreshToken })

            // Guardamos en memoria el token de autenticacion
            await AsyncStorage.setItem('token', token)

            return { token, refreshToken }
        } catch (error) {
            return { token: '', refreshToken: '' }
        }
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: '',
        refreshToken: '',
    },
    reducers: {
        setToken: (state, { payload: token }) => {
            state.token = token
        },
        setRefreshToken: (state, { payload: refreshToken }) => {
            state.refreshToken = refreshToken
        }
    },
    extraReducers: {
        [signUp.fulfilled]: (state, { payload: { token, refreshToken } }) => {
            state.token = token
            state.refreshToken = refreshToken
        },
        [login.fulfilled]: (state, { payload: { token, refreshToken } }) => {
            state.token = token
            state.refreshToken = refreshToken
        },
        [logout.fulfilled]: (state) => {
            state.token = ''
            state.refreshToken = ''
        },
        [refreshLogin.fulfilled]: (state, { payload: { token, refreshToken } }) => {
            state.token = token
            state.refreshToken = refreshToken
        },
        [refreshAuthToken.fulfilled]: (state, { payload: { token, refreshToken } }) => {
            state.token = token
            state.refreshToken = refreshToken
        }
    }
})

export const { setToken, setRefreshToken } = authSlice.actions

export default authSlice.reducer