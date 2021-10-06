import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apcGet, apcPost, apcPath, apcDelete } from '../util/apiPayloadCreator';
import reduceArray from './../../util/reduceArray';

export const fetchGambiteos = createAsyncThunk('gambiteos/fetchGambiteos', apcGet('/gambiteos/feed'))

export const crearGambiteo = createAsyncThunk('gambiteo/crearGambiteo', apcPost('/gambiteos'))

export const fetchGambiteo = createAsyncThunk('gambiteo/getGambiteoDetail', apcGet('/gambiteos', 'id'))

export const editarGambiteo = createAsyncThunk('gambiteo/editarGambiteo', apcPath('/gambiteos'))

export const eliminarGambiteo = createAsyncThunk('gambiteo/eliminarGambiteo', apcDelete('/gambiteos', 'gambiteoId'))

export const votar = createAsyncThunk('gambiteo/votar', apcPost('/gambiteos/votar'))

export const confirmar = createAsyncThunk('gambiteo/confirmar', apcPost('/gambiteos/confirmar'))

export const invitarAmigosAGambiteo = createAsyncThunk('gambiteo/invitarAmigosAGambiteo', apcPost('/gambiteos/invitar'))

const gambiteoSlice = createSlice({
    name: 'gambiteo',
    initialState: {
        gambiteos: {},
        nuevoGambiteo: {},
        nuevoGambiteoModificado: false,
        currentChat: null,
    },
    reducers: {
        add: (state, { payload: gambiteo }) => {
            state.gambiteos[gambiteo.id] = gambiteo
        },
        update: (state, { payload: gambiteo }) => {
            state.gambiteos[gambiteo.id] = gambiteo
        },
        remove: (state, { payload: gambiteoId }) => {
            delete state.gambiteos[gambiteoId]
        },
        updateCreacionGambiteo: (state, { payload: { field, value } }) => {
            const gambiteoActualizar = state.nuevoGambiteo
            gambiteoActualizar[field] = value
            state.nuevoGambiteo = gambiteoActualizar
            state.nuevoGambiteoModificado = true
        },
        limpiarCreacionGambiteo: (state) => {
            state.nuevoGambiteo = {}
            state.nuevoGambiteoModificado = false
        },
        edicionGambiteo: (state, { payload: gambiteo }) => {
            state.nuevoGambiteo = gambiteo
            state.nuevoGambiteoModificado = false
        },
        setCurrentChat: (state, { payload: gid }) => {
            state.currentChat = gid
        },
        messageCount: (state, { payload: { gid, unreadMessages } }) => {
            if (state.currentChat !== gid || unreadMessages === 0) {
                state.gambiteos[gid] = { ...state.gambiteos[gid], unreadMessages: unreadMessages }
            }
        },
    },
    extraReducers: {
        [fetchGambiteos.fulfilled]: (state, { payload: gambiteos }) => {
            state.gambiteos = reduceArray(gambiteos)
        },
        [fetchGambiteo.fulfilled]: (state, { payload: gambiteo }) => {
            state.gambiteos[gambiteo.id] = gambiteo
        },
        [editarGambiteo.fulfilled]: (state, { payload: gambiteo }) => {
            state.gambiteos[gambiteo.id] = gambiteo
        },
        [eliminarGambiteo.fulfilled]: (state, { payload: gambiteoId }) => {
            delete state.gambiteos[gambiteoId]
        },
        // [votar.fulfilled]: (state, { payload: gambiteo }) => {
        //     state.gambiteos[gambiteo.id] = gambiteo
        // },
        // [confirmar.fulfilled]: (state, { payload: gambiteo }) => {
        //     state.gambiteos[gambiteo.id] = gambiteo
        // },
        [invitarAmigosAGambiteo.fulfilled]: (state, { payload: gambiteo }) => {
            state.gambiteos[gambiteo.id] = gambiteo
        },
    }
})

export const { updateCreacionGambiteo, limpiarCreacionGambiteo, edicionGambiteo, setCurrentChat, messageCount } = gambiteoSlice.actions

export const gambiteoSliceName = gambiteoSlice.name

export default gambiteoSlice.reducer