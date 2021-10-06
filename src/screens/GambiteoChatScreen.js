import { Icon, useTheme } from '@ui-kitten/components';
import 'dayjs/locale/es';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import 'react-native-get-random-values';
import { Bubble, GiftedChat, Send } from 'react-native-gifted-chat';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidV4 } from 'uuid';
import TopNavigationChat from '../components/navigation/TopNavigationChat';
import { clearChat, markAsRead, sendMessage } from '../store/slices/chatSlice';
import { setCurrentChat } from '../store/slices/gambiteoSlice';
import ScreenLayout from './../components/layout/ScreenLayout';
import useNavigationEvents from './../hooks/useNavigationEvents';
import useSocket from './../hooks/useSocket';
import { fetchChatMessages } from './../store/slices/chatSlice';

const GambiteoChatScreen = ({ navigation, route }) => {
    const theme = useTheme()
    const dispatch = useDispatch()
    const socket = useSocket()

    const gid = route.params.gid;

    const user = useSelector(({ user }) => ({
        uid: user.uid,
        nombre: user.nombre,
        img: user.img,
    }))

    const messages = useSelector(({ chat }) => chat.messages)
    const silenced = useSelector(({ chat }) => chat.silenced)

    useNavigationEvents({
        'focus': () => {
            socket.subscribe('chat')
            dispatch(setCurrentChat(gid))
        },
        'blur': () => {
            socket.unsubscribe('chat')
            dispatch(setCurrentChat(null))
        }
    }, navigation)

    useEffect(() => {
        if (gid) {
            dispatch(fetchChatMessages({ gid }))
        }
        return () => {
            dispatch(clearChat())
        }
    }, [gid])

    useEffect(() => {
        const lastMessage = messages[0]
        if (lastMessage?.unread) {
            dispatch(markAsRead({ msgId: lastMessage._id }))
        }
    }, [messages.length])

    // const appStateHandler = (state) => {
    //     if (state === 'active') {
    //         dispatch({ type: 'join-chat-room', payload: gid })
    //         emit({ type: 'server/join', data: { gid: gid } })
    //     } else {
    //         dispatch({ type: 'leave-chat-room', payload: gid })
    //         emit({ type: 'server/leave', data: { gid: gid } })
    //     }
    // }

    // useEffect(() => {
    //     if (gid) {
    //         dispatch({ type: 'join-chat-room', payload: gid })
    //         emit({ type: 'server/join', data: { gid: gid } })
    //         AppState.addEventListener('change', appStateHandler)

    //         return () => {
    //             dispatch({ type: 'server/leave', data: { gid: gid } })
    //             emit({ type: 'leave-chat-room', payload: gid })
    //             AppState.removeEventListener('change', appStateHandler)
    //         }
    //     }
    // }, [gid])

    const onSend = (messages = []) => {
        const msg = {
            text: messages[0].text,
            gid: gid,
            tempId: uuidV4(),
            user: user
        }
        dispatch(sendMessage(msg))
    }

    return (
        <ScreenLayout>
            <TopNavigationChat navigation={navigation} gid={gid} silenced={silenced} />
            <GiftedChat
                locale="es"
                messages={messages}
                onSend={onSend}
                renderUsernameOnMessage
                user={{
                    _id: user.uid,
                    name: user.nombre,
                    avatar: user.img,
                }}
                renderBubble={props =>
                    <Bubble
                        {...props}
                        wrapperStyle={{
                            right: {
                                backgroundColor: theme['color-primary-500']
                            },
                        }}
                    />
                }
                textInputProps={{ placeholder: 'Escribe algo pichi...' }}
                renderSend={props =>
                    <Send {...props}>
                        <View style={{ width: props.composerHeight, height: props.composerHeight, alignItems: 'center', justifyContent: 'center', marginHorizontal: 10 }}>
                            <Icon style={{ width: props.composerHeight / 1.5, height: props.composerHeight / 1.5 }} fill={theme['color-primary-500']} name="paper-plane-outline" />
                        </View>
                    </Send>
                }
            />
        </ScreenLayout>
    );
}

const styles = StyleSheet.create({
    icon: {
        width: 32,
        height: 32
    }
})

export default GambiteoChatScreen;