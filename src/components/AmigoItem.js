import { Avatar, Text } from '@ui-kitten/components';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

const AmigoItem = ({ nombre, username, img, onPress, style }) => {

    const imgSrc = img ? { uri: img } : require('../../assets/images/avatar.png')

    return (
        <TouchableOpacity activeOpacity={0.75} disabled={!onPress} onPress={onPress}>
            <View style={[styles.item, style]}>
                <Avatar style={{ marginLeft: 15 }} source={imgSrc} size="giant" />
                <View style={styles.text}>
                    <Text status="primary" category="h6" numberOfLines={1} >{nombre}</Text>
                    <Text category="c1" appearance="hint">@{username}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    text: {
        flex: 1,
        marginLeft: 20
    }
})

export default AmigoItem;