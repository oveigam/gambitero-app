import React, { createContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import io from 'socket.io-client';
import { SOCKET_URL } from '@env';
import { fetchGambiteos } from './../store/slices/gambiteoSlice';

export const SocketContext = createContext()

export const SocketProvider = ({ children }) => {
    const dispatch = useDispatch()

    const [socket, setSocket] = useState()

    const token = useSelector(state => state.auth.token)
    const refreshToken = useSelector(state => state.auth.refreshToken)

    const subscriptions = useRef({
        gambiteo: true
    })

    const subscriptionsActions = {
        gambiteo: () => dispatch(fetchGambiteos())
    }

    useEffect(() => {
        if (token && refreshToken && !socket) {
            console.log('connecting socket')
            const tempSocket = io.connect(SOCKET_URL, {
                transports: ['websocket'],
                auth: { token }
            })

            tempSocket.subscribe = function (type) {
                const subscriptionName = 'subscription/' + type
                this.on(subscriptionName, dispatch)
                this.emit('subscribe', { type })

                subscriptions.current[type] = true
            }

            tempSocket.unsubscribe = function (type) {
                const subscriptionName = 'subscription/' + type
                this.emit('unsubscribe', { type })
                this.off(subscriptionName)

                delete subscriptions.current[type]
            }

            tempSocket.on('server-connection', () => {
                for (const sub of Object.keys(subscriptions.current)) {
                    tempSocket.off('subscription/' + sub)
                    tempSocket.subscribe(sub)
                    if (subscriptionsActions[sub]) {
                        subscriptionsActions[sub]()
                    }
                }
            })

            setSocket(tempSocket)
        }
        if (!token && !refreshToken && socket) {
            console.log('disconnecting socket')
            socket.disconnect()
            setSocket(null)
        }
    }, [token, refreshToken])

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
}