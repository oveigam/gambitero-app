import * as Picker from 'expo-image-picker';
import React, { useState } from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { Avatar, Button, Icon } from '@ui-kitten/components';


const ImagePickerIconButton = (props) => {
    const [pickedImage, setPickedImage] = useState(props.img);

    const { setImage } = props

    const pickImageHandler = async () => {
        const image = await Picker.launchImageLibraryAsync();
        if (image.uri) {
            setPickedImage(image.uri)
        }
        if (setImage && image.uri) {
            const fileName = image.uri.replace(/^.*[\\\/]/, '');
            const type = image.type + '/' + fileName.substr(fileName.lastIndexOf('.') + 1);
            setImage({
                uri: image.uri,
                type: type,
                name: fileName,
            })
        }
    }

    return (
        <View style={styles.container}>
            {
                pickedImage ?
                    <TouchableWithoutFeedback onPress={pickImageHandler}>
                        <Avatar style={styles.image}  source={{ uri: pickedImage }} size="giant" />
                    </TouchableWithoutFeedback>
                    :
                    <Button
                        style={styles.boton}
                        status="primary"
                        appearance="ghost"
                        accessoryLeft={(props) => <Icon {...props} name="camera-outline" />}
                        onPress={pickImageHandler}
                    />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 72,
        height: 72,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: 70,
        height: 70,
    },
    boton: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
})

export default ImagePickerIconButton;