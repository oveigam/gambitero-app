import { Button } from '@ui-kitten/components';
import React from 'react';
import { StyleSheet } from 'react-native';

const AddCampoPresetButton = ({ icon, label, onPress, disabled, style }) => {

    return (
        <Button
            style={{...styles.boton, ...style}}
            status="primary"
            appearance="ghost"
            disabled={disabled}
            accessoryLeft={icon}
            onPress={onPress}
        >
            {label}
        </Button>
    );
}

const styles = StyleSheet.create({
    boton: {
        flexDirection: 'column',
    },
    boton1: {
        borderRadius: 28,
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        height: 56,
        width: 56,
        borderRadius: 28,
        alignItems: 'center',
        justifyContent: 'center',
    },
    label: {
        marginTop: -2
    },
    plus: {
        position: 'absolute',
        top: 2,
        right: 7,

    },
})

export default AddCampoPresetButton;