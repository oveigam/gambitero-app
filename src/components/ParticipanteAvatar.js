import { Avatar, Button, Icon, Text } from '@ui-kitten/components';
import React from 'react';
import { StyleSheet, View } from 'react-native';


const ParticipanteAvatar = ({ style, nombre, img, onRemove }) => {

    const imgSrc = img ? { uri: img } : require('../../assets/images/avatar.png')

    return (
        <View style={[styles.container, style]}        >
            <Avatar source={imgSrc} />
            <Text status="primary" category="label" numberOfLines={1} >{nombre}</Text>
            <Button
                style={styles.boton}
                size="small"
                appearance="ghost"
                status="danger"
                onPress={onRemove}
                accessoryLeft={(props) => <Icon {...props} name="close-square-outline" />}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 65,
        margin: 5,
        paddingTop: 10
    },
    boton: {
        position: 'absolute',
        top: -5,
        right: 0,
        left: 38
        
    }
})

export default ParticipanteAvatar;


{/* <Button
style={[styles.boton, style]}
status="primary"
appearance="ghost"
accessoryLeft={() => <Avatar source={imgSrc} />}
>
{nombre}
</Button> */}