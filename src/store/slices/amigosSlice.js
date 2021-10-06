import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apcGet, apcPost } from './../util/apiPayloadCreator';
import traducirStatusAHeader from './../util/traducirStatusAHeader';

export const fetchAmigos = createAsyncThunk('amigos/fetchAmigos', apcGet('/friends'))

export const addAmigo = createAsyncThunk('amigos/addAmigo', apcPost('/friends'))

export const acceptAmigo = createAsyncThunk('amigos/acceptAmigo', apcPost('/friends/accept'))
export const rejectAmigo = createAsyncThunk('amigos/rejectAmigo', apcPost('/friends/reject'))
export const deleteAmigo = createAsyncThunk('amigos/deleteAmigo', apcPost('/friends/delete'))
export const blockAmigo = createAsyncThunk('amigos/blockAmigo', apcPost('/friends/block'))
export const unblockAmigo = createAsyncThunk('amigos/unblockAmigo', apcPost('/friends/unblock'))

const amigosSlice = createSlice({
    name: 'amigos',
    initialState: {
        amigos: [],
    },
    reducers: {
        // TODO este evento de socket podria hacerse reciviendo solo el amigo que cambio en lugar de toda la puta lista
        change: (state, { payload: amigos }) => {
            const amigosSections = [];

            for (const amigo of amigos) {
                // Obtenemos el texto de la seccion segun el estado de amigsta (amistades, pendientes, bloqueadas, etc.)
                const header = traducirStatusAHeader(amigo.status)

                // Miramos si ya tenemos algun dato para esa seccion
                let seccionExistente = false
                for (const section of amigosSections) {
                    // Si ya existen datos para esa seccion anhadimos el amigo
                    if (section.title === header) {
                        seccionExistente = true
                        section.data.push(amigo)
                    }
                }

                // Si no existen datos creamos la seccion de cero con el amigo
                if (!seccionExistente) {
                    amigosSections.push({
                        title: header,
                        data: [amigo]
                    })
                }

            }

            state.amigos = amigosSections
        }
    },
    extraReducers: {
        [fetchAmigos.fulfilled]: (state, { payload: amigos }) => {
            const amigosSections = [];

            for (const amigo of amigos) {
                // Obtenemos el texto de la seccion segun el estado de amigsta (amistades, pendientes, bloqueadas, etc.)
                const header = traducirStatusAHeader(amigo.status)

                // Miramos si ya tenemos algun dato para esa seccion
                let seccionExistente = false
                for (const section of amigosSections) {
                    // Si ya existen datos para esa seccion anhadimos el amigo
                    if (section.title === header) {
                        seccionExistente = true
                        section.data.push(amigo)
                    }
                }

                // Si no existen datos creamos la seccion de cero con el amigo
                if (!seccionExistente) {
                    amigosSections.push({
                        title: header,
                        data: [amigo]
                    })
                }

            }

            state.amigos = amigosSections
        }
    }
})

export default amigosSlice.reducer