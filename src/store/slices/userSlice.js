import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apcPath } from './../util/apiPayloadCreator';

export const updateUserProfile = createAsyncThunk('user/updateUserProfile', apcPath('/users'))

const userSlice = createSlice({
    name: 'user',
    initialState: {
        uid: null,
        username: '',
        email: '',
        nombre: '',
        img: '',
        notificacionesConfig: {}
    },
    reducers: {
        setUserData: (state, { payload: { uid, username, email, nombre, img, notificacionesConfig } }) => {
            state.uid = uid
            state.username = username
            state.email = email
            state.nombre = nombre
            state.img = img
            state.notificacionesConfig = notificacionesConfig
        }
    },
    extraReducers: {
        [updateUserProfile.fulfilled]: (state, { payload }) => {
            const { uid, username, email, nombre, img, notificacionesConfig } = payload.userData
            state.uid = uid
            state.username = username
            state.email = email
            state.nombre = nombre
            state.img = img
            state.notificacionesConfig = notificacionesConfig
        }
    }
})

export const { setUserData } = userSlice.actions

export default userSlice.reducer