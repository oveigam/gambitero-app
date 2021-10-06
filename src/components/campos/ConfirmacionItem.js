import { Avatar, Icon, Text, useTheme } from '@ui-kitten/components';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const ConfirmacionItem = ({ valor, nombre, username, img, style }) => {
    const theme = useTheme()

    const imgSrc = img ? { uri: img } : require('../../../assets/images/avatar.png')

    const backgroundColor = valor ? theme['color-success-100'] : theme['color-danger-100']
    const iconName = valor ? 'checkmark-outline' : 'close-outline'
    const iconColor = valor ? theme['color-success-500'] : theme['color-danger-500']
    const nameStatus = valor ? 'success' : 'danger'

    return (
        <View style={[styles.item, { backgroundColor: backgroundColor }, style]}>
            <Icon style={styles.icon} fill={iconColor} name={iconName} />
            <Avatar style={{ marginLeft: 15 }} source={imgSrc} size="giant" />
            <View style={styles.text}>
                <Text status={nameStatus} category="h6" numberOfLines={1} >{nombre}</Text>
                <Text status={nameStatus} category="c1" appearance="hint">@{username}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingVertical: 10
    },
    text: {
        flex: 1,
        marginLeft: 15
    },
    icon: {
        width: 24,
        height: 24,
    }
})

export default ConfirmacionItem;