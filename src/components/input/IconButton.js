import { Button, Icon } from '@ui-kitten/components';
import React from 'react';
import { StyleSheet } from 'react-native';

const IconButton = (props) => {
    const { style, name } = props

    return (
        <Button
            {...props}
            style={{ ...styles.boton, ...style }}
            accessoryLeft={(props) => <Icon {...props} name={name} />}
        />
    );
}

const styles = StyleSheet.create({
    boton: {
        borderRadius: 999,
        width: 20,
        height: 20
    }
})

export default IconButton;