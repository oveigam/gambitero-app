import { Button, Icon, List, Text, useTheme } from '@ui-kitten/components';
import React from 'react';
import { View } from 'react-native';
import useGambiteoCreator from '../../../hooks/useGambiteoCreator';
import ParticipanteAvatar from '../../ParticipanteAvatar';

const GambiteoInvitacionesList = ({ onAddPress }) => {
    const theme = useTheme()
    const { nuevoGambiteo: { participantes }, actualizarGambiteo } = useGambiteoCreator()

    const deselectAmigo = (uid) => {
        actualizarGambiteo('participantes', participantes.filter(p => p.id !== uid))
    }

    const listHeader = (
        <Button
            style={{ margin: 5 }}
            appearance="ghost"
            status="primary"
            onPress={onAddPress}
            accessoryLeft={(props) => <Icon {...props} name="person-add-outline" />}
        />
    )

    return (
        <View style={{ marginVertical: 10, }}>
            <Text style={{ marginHorizontal: 15, }} appearance="hint" category="label">Invitados</Text>
            <List
                style={{ marginTop: 5, }}
                contentContainerStyle={{ alignItems: 'center' }}
                removeClippedSubviews={false}
                keyboardShouldPersistTaps={'handled'}
                ListHeaderComponent={listHeader}
                horizontal
                data={participantes}
                renderItem={({ item }) => <ParticipanteAvatar nombre={item.nombre} img={item.img} onRemove={() => deselectAmigo(item.id)} />}
            />
        </View>
    );
}

export default GambiteoInvitacionesList;