import React, { useEffect, useState } from 'react';
import ScreenLayout from '../components/layout/ScreenLayout';
import useNavigationEvents from './../hooks/useNavigationEvents';
import axios from 'axios';
import { Divider, List, useTheme } from '@ui-kitten/components';
import AmigoItem from './../components/AmigoItem';
import useGambiteoCreator from '../hooks/useGambiteoCreator';
import TopNavigationSimpleBack from '../components/navigation/TopNavigationSimpleBack';
import { StyleSheet, View } from 'react-native';
import ParticipanteAvatar from '../components/ParticipanteAvatar';

const InvitarAmigosCrearGambiteoScreen = ({ navigation }) => {
    const theme = useTheme()

    const { nuevoGambiteo: { participantes }, actualizarGambiteo } = useGambiteoCreator()

    const [amigos, setAmigos] = useState([])

    useNavigationEvents({
        focus: async () => {
            const { data } = await axios.get('/friends/accepted')
            setAmigos(data)
        }
    }, navigation)

    const selectAmigo = (user) => {
        actualizarGambiteo('participantes', [...participantes, user])
    }

    const deselectAmigo = (uid) => {
        actualizarGambiteo('participantes', participantes.filter(p => p.id !== uid))
    }

    const listData = amigos.filter(u => !participantes.some(a => u.id === a.id))

    return (
        <ScreenLayout>
            <TopNavigationSimpleBack navigation={navigation} />
            <View>
                <List
                    style={{ marginBottom: 5 }}
                    horizontal
                    contentContainerStyle={{ alignItems: 'flex-start' }}
                    removeClippedSubviews={false}
                    keyboardShouldPersistTaps={'handled'}
                    data={participantes}
                    renderItem={({ item: user }) =>
                        <ParticipanteAvatar
                            nombre={user.nombre}
                            img={user.img}
                            onRemove={() => deselectAmigo(user.id)}
                        />
                    }
                    ItemSeparatorComponent={Divider}
                />
                <Divider />
                <List
                    removeClippedSubviews={false}
                    keyboardShouldPersistTaps={'handled'}
                    data={listData}
                    renderItem={({ item: user }) =>
                        <AmigoItem
                            nombre={user.nombre}
                            username={user.username}
                            img={user.img}
                            onPress={() => selectAmigo(user)}
                        />
                    }
                    ItemSeparatorComponent={Divider}
                />
            </View>
        </ScreenLayout>
    );
}

const styles = StyleSheet.create({
    content: {
        padding: 20
    }
})

export default InvitarAmigosCrearGambiteoScreen;