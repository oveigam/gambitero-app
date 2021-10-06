import React, { useState } from 'react';
import { Card, Icon, Input, Text, Button } from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';
import Modal from 'react-native-modal';

const AddFriendDialog = (props) => {
    const { visible, onDismiss, onSubmit, loading } = props;

    const [username, setUsername] = useState('');

    const aceptar = () => {
        onSubmit(username);
        setUsername('')
    }

    return (
        <Modal
            avoidKeyboard
            hasBackdrop
            isVisible={visible}
            onBackdropPress={onDismiss}
            onBackButtonPress={onDismiss}
        >
            <Card disabled={true}>
                <Text status="primary">Agregar amigo</Text>
                <Input
                    style={styles.input}
                    label="Username"
                    value={username}
                    onChangeText={text => setUsername(text)}
                    autoCapitalize="none"
                    autoCorrect={false}
                    autoFocus
                    accessoryLeft={(props) => <Icon {...props} name="at-outline" />}
                />
                <View style={styles.botonera}>
                    <Button
                        appearance="ghost"
                        onPress={onDismiss}
                    >
                        Cancelar
                    </Button>
                    <Button
                        onPress={aceptar}
                    >
                        Aceptar
                    </Button>
                </View>
            </Card>
        </Modal>
    );
}

const styles = StyleSheet.create({
    input: {
        marginVertical: 20
    },
    botonera: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
})

export default AddFriendDialog;