import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FlatList, RefreshControl, SectionList, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AddFriendDialog from './../components/AddFriendDialog';
import Friend from '../components/Friend'
import { fetchAmigos } from '../store/slices/amigosSlice';
import useNavigationEvents from './../hooks/useNavigationEvents';
import useSocket from './../hooks/useSocket';
import useListRefresh from './../hooks/useListRefresh';
import ScreenLayout from './../components/layout/ScreenLayout';
import TopNavigationAmigos from '../components/navigation/TopNavigationAmigos';
import { Divider, Layout, Text, useTheme } from '@ui-kitten/components';

const AmigosScreen = ({ navigation }) => {
    const theme = useTheme()
    const dispatch = useDispatch()
    const socket = useSocket()

    const { refreshing, refresh } = useListRefresh(() => dispatch(fetchAmigos()))

    const friends = useSelector(state => state.amigos.amigos)

    const [invitarAmigoVisible, setInvitarAmigoVisible] = useState(false);
    const [loadingAddAmigo, setLoadingAddAmigo] = useState(false)

    useNavigationEvents({
        'focus': () => {
            socket.subscribe('amigos')
            dispatch(fetchAmigos())
        },
        'blur': () => {
            socket.unsubscribe('amigos')
        }
    }, navigation)

    const addAmigo = async (username) => {
        try {
            setLoadingAddAmigo(true)
            await axios.post('/friends', { amigoUsername: username });
            setLoadingAddAmigo(false)
        } catch (error) {
            setLoadingAddAmigo(false)
            console.log('error', error.response.data.message)
        } finally {
            setInvitarAmigoVisible(false)
        }
    }

    return (
        <>
            <ScreenLayout>
                <TopNavigationAmigos navigation={navigation} onAddPress={() => setInvitarAmigoVisible(true)} />
                <SectionList
                    keyExtractor={(item, index) => item.status + index}
                    sections={friends}
                    renderItem={({ item }) =>
                        <Friend
                            status={item.status}
                            uid={item.user?.id}
                            img={item.user?.img}
                            nombre={item.user?.nombre}
                            username={item.user?.username}
                        />
                    }
                    renderSectionHeader={({ section: { title } }) => (
                        <Layout level="2" >
                            <Text style={styles.header} appearance="hint" category="label" >{title}</Text>
                        </Layout>
                    )}
                    SectionSeparatorComponent={Divider}
                    ItemSeparatorComponent={Divider}
                    refreshControl={
                        <RefreshControl
                            colors={[theme['color-primary-500']]}
                            onRefresh={refresh}
                            refreshing={refreshing}
                        />
                    }
                />
                <AddFriendDialog
                    loading={loadingAddAmigo}
                    visible={invitarAmigoVisible}
                    onDismiss={() => setInvitarAmigoVisible(false)}
                    onSubmit={addAmigo}
                />
            </ScreenLayout>
        </>
    )
}

const styles = StyleSheet.create({
    header: {
        padding: 5,
        fontWeight: 'bold',
        marginHorizontal: 10,
        marginTop: 10
    },
    boton: {
        marginHorizontal: 5
    }
})

export default AmigosScreen;