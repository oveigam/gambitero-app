import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apcPath, apcPost } from "../util/apiPayloadCreator";
import { GiftedChat } from 'react-native-gifted-chat';
import axios from "axios";
import { messageCount } from "./gambiteoSlice";

export const fetchChatMessages = createAsyncThunk(
    'chat/fetchChatMessages',
    async ({ gid }, { dispatch, rejectWithValue }) => {
        try {
            const { data: message } = await axios.get(`/messages/${gid}`)

            dispatch(messageCount({ gid, unreadMessages: 0 }))

            return message
        } catch (error) {
            console.error(error)
            dispatch(setError(error.response.data))
            return rejectWithValue(error.response.data)
        }
    }
)

export const sendMessage = createAsyncThunk(
    'chat/sendMessage',
    async ({ text, gid, tempId, user }, { dispatch, rejectWithValue }) => {
        try {
            const { data: message } = await axios.post('/messages/sendMessage', { text, gid })

            return {
                message,
                tempId,
            }
        } catch (error) {
            dispatch(setError(error.response.data))
            return rejectWithValue(error.response.data)
        }
    }
)

export const markAsRead = createAsyncThunk('chat/markAsRead', apcPath('/messages', 'msgId'))

export const silenciarChat = createAsyncThunk('chat/silenciarChat', apcPost('/users/silenciarChat', 'gid'))

const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        messages: [],
        silenced: false
    },
    reducers: {
        insert: (state, { payload: chatMessage }) => {
            state.messages = GiftedChat.append(state.messages, chatMessage)
        },
        clearChat: (state) => {
            state.messages = []
        },
        readByEveryone: (state, { payload: msgId }) => {
            for (const msg of state.messages) {
                if (msg._id === msgId) {
                    msg.received = true
                    break
                }
            }
        }
    },
    extraReducers: {
        [fetchChatMessages.fulfilled]: (state, { payload: chatMessages }) => {
            state.messages = chatMessages
        },
        [sendMessage.pending]: (state, { meta }) => {
            const { tempId, text, user } = meta.arg
            state.messages = GiftedChat.append(state.messages, {
                _id: tempId,
                text: text,
                pending: true,
                user: {
                    _id: user.uid,
                    name: user.nombre,
                    avatar: user.img
                }
            })
        },
        [sendMessage.fulfilled]: (state, { payload: { message, tempId } }) => {
            for (const msg of state.messages) {
                if (msg._id === tempId) {
                    msg._id = message.id
                    msg.createdAt = message.createdAt
                    msg.sent = true
                    msg.pending = false
                    break
                }
            }
        },
        [markAsRead.fulfilled]: (state, { payload: { msgId } }) => {
            for (const msg of state.messages) {
                if (msg._id === msgId) {
                    msg.unread = false
                    break
                }
            }
        },
        [silenciarChat.fulfilled]: (state, { payload: { silenced } }) => {
            state.silenced = silenced
        },
    }
})

export const { clearChat } = chatSlice.actions

export default chatSlice.reducer