import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./slices/appSlice";
import authSlice from "./slices/authSlice";
import userSlice from "./slices/userSlice";
import gambiteoSlice from "./slices/gambiteoSlice";
import amigosSlice from "./slices/amigosSlice";
import chatSlice from "./slices/chatSlice";

export default store = configureStore({
    reducer: {
        app: appSlice,
        auth: authSlice,
        user: userSlice,
        gambiteo: gambiteoSlice,
        amigos: amigosSlice,
        chat: chatSlice
    }
})