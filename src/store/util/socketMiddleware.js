import createSocketIoMiddleware from "redux-socket.io";
import io from 'socket.io-client';
import { SERVER_URL } from "../../util/Constants";

let socketMiddleware = null;
let initedSocketMiddleware = null;
let socket = null;

const initSocketIoMiddleware = store => next => action => {
    if (socketMiddleware && !initedSocketMiddleware) {
        initedSocketMiddleware = socketMiddleware(store);
    }
    if (initedSocketMiddleware) {
        return initedSocketMiddleware(next)(action);
    }
    return next(action);
}

const unsetSocketIoMiddleware = () => {
    socketMiddleware = null;
    initedSocketMiddleware = null;
}

const setSocketIoMiddleware = token => {
    socket = io.connect(SERVER_URL, {
        query: { token }
    })
    socketMiddleware = createSocketIoMiddleware(socket, 'server/')
    initedSocketMiddleware = null;
}

const isDisconnected = () => socket && socket.disconnected

const onReady = (cb) => {
    socket.on('ready', cb)
}

export default initSocketIoMiddleware;
export {
    setSocketIoMiddleware,
    unsetSocketIoMiddleware,
    isDisconnected,
    onReady
}