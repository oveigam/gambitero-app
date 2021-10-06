import { Input, Text } from '@ui-kitten/components';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const InputWithLabel = (props) => {
    const { style, Component, label, inputStyle } = props

    const InputComponent = Component ? Component : Input

    return (
        <View style={style}>
            <Text status="primary" style={styles.inputHeader}>{label}:</Text>
            <InputComponent {...props} style={inputStyle} title={undefined} autoCorrect={false} />
        </View>
    );
}

const styles = StyleSheet.create({
    inputHeader: {
        fontWeight: 'bold',
        margin: 2
    },
})

export default InputWithLabel;