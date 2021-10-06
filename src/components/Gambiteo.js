import { Avatar, Icon, Text } from '@ui-kitten/components';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import IconBadge from './IconBadge';

const Gambiteo = (props) => {

    const { onPress, onChatPress } = props
    const { titulo, img, unreadMessages } = props.gambiteo

    const imgSrc = img ? { uri: img } : require('../../assets/images/gambiteo_placeholder.png')

    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.container}>
                <Avatar style={!img ? styles.noImage : undefined} size="giant" source={imgSrc} />
                <View style={styles.rightColumn}>
                    <View style={styles.title} >
                        <Text status="primary" category="h6">{titulo}</Text>
                    </View>
                    <View style={styles.botonera}>
                        <IconBadge
                            icon={({ style }) => <Icon style={[style, { marginHorizontal: 0 }]} name="message-square-outline" />}
                            count={unreadMessages}
                            onPress={onChatPress} />
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 5,
        paddingHorizontal: 15
    },
    noImage: {
        tintColor: 'grey',
        opacity: 0.3
    },
    rightColumn: {
        flex: 1,
        paddingHorizontal: 15,
    },
    botonera: {
        flexDirection: 'row',
    },
    title: {
        paddingTop: 10
    }
})

export default Gambiteo;