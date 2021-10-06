import React from 'react';
import { StyleSheet, View } from 'react-native';
import useGambiteoCreator from './../../hooks/useGambiteoCreator';
import { Input } from '@ui-kitten/components';
import ImagePickerIconButton from './../ImagePickerIconButton';

const GambiteoBasicInfoForm = (props) => {

    const { nuevoGambiteo: { titulo, img }, actualizarGambiteo } = useGambiteoCreator();

    return (
        <View style={styles.container}>
            <ImagePickerIconButton img={img} setImage={(value) => actualizarGambiteo('img', value)} />
            <Input
                style={styles.titulo}
                label="Título"
                value={titulo}
                onChangeText={text => actualizarGambiteo('titulo', text)}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
        marginVertical: 10,
    },
    titulo: {
        flex: 1,
        marginHorizontal: 8,
        justifyContent: 'flex-start'
    },
})

export default GambiteoBasicInfoForm;