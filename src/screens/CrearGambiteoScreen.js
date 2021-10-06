import { Divider, List, Text, useTheme } from '@ui-kitten/components';
import React, { useEffect } from 'react';
import { Alert, Keyboard, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Campo from '../components/campos/Campo';
import GambiteoInvitacionesList from '../components/creacionGambiteo/creacionCampos/GambiteoInvitacionesList';
import GambiteoBasicInfoForm from '../components/creacionGambiteo/GambiteoBasicInfoForm';
import GambiteoPresetsBotonera from '../components/creacionGambiteo/GambiteoPresetsBotonera';
import ScreenLayout from '../components/layout/ScreenLayout';
import ListFooter from '../components/ListFooter';
import TopNavigationSimpleForm from '../components/navigation/TopNavigationSimpleForm';
import useLoading from '../hooks/useLoading';
import { refreshAuthToken } from '../store/slices/authSlice';
import { crearGambiteo, editarGambiteo } from '../store/slices/gambiteoSlice';
import { getPreset } from '../util/camposGambiteoUtil';
import getIdentificador from '../util/getIdentificador';
import useGambiteoCreator from './../hooks/useGambiteoCreator';

const CrearGambiteoScreen = ({ navigation }) => {
    const theme = useTheme()
    const dispatch = useDispatch()

    const { setLoading } = useLoading()

    // Obtenemos el gestor de creacion de gambiteo
    const { nuevoGambiteo, actualizarGambiteo, limpiarGambiteo } = useGambiteoCreator()
    const { id, titulo, img, participantes, campos, modificado } = nuevoGambiteo

    // Añadimos el boton de agrear participantes a la navigation bar
    useEffect(() => {
        navigation.removeListener('beforeRemove')
        navigation.addListener('beforeRemove', (e) => {
            Keyboard.dismiss();

            if (!modificado) {
                return;
            }

            e.preventDefault();

            Alert.alert(
                '¿Estás seguro?',
                'Se perderán los datos que no se hayan guardado',
                [
                    { text: "Cancelar", style: 'cancel', onPress: () => { } },
                    {
                        text: 'OK',
                        style: 'destructive',
                        onPress: () => {
                            limpiarGambiteo()
                            navigation.dispatch(e.data.action)
                        },
                    },
                ]
            );
        })

        return () => {
            navigation.removeListener('beforeRemove')
        };
    }, [modificado])

    const editCampoHandler = (campo) => {
        navigation.navigate('CrearCampo', { edit: campo });
    }

    const removeCampoHandler = (campo) => {
        actualizarGambiteo("campos", campos.filter(c => getIdentificador(c) !== getIdentificador(campo)))
    }

    // Vamos a necesitar el refreshToken para refrescar preventivamente el jwt token antes de hacer la petición de crear
    const refreshToken = useSelector(state => state.auth.refreshToken)

    const submitCreacion = async () => {
        navigation.removeListener('beforeRemove')

        // Al llevar imagen tiene que ir como FormData
        const form = new FormData();
        form.append('titulo', titulo)
        form.append('img', img)
        form.append('campos', JSON.stringify(campos))
        form.append('participantes', JSON.stringify(participantes))

        setLoading(true)

        // Actualizamos el jwt token preventivamente porque, en heroku, si esta caducado  falla la subida 
        // de imagenes y se corta la conexion antes de que pueda refrescarse automaticamente
        await dispatch(refreshAuthToken({ refreshToken }))

        if (id) {
            form.append('id', id)
            await dispatch(editarGambiteo(form))
        } else {
            await dispatch(crearGambiteo(form))
        }

        limpiarGambiteo()

        setLoading(false)

        navigation.goBack()
    }

    const disabledPresets = []
    for (let c of campos) {
        if (c.presetId) {
            disabledPresets.push(c.presetId)
        }
    }

    const valido = !!titulo && campos?.length > 0;

    const listHeader = (
        <>
            <GambiteoBasicInfoForm />
            <Divider />
            <GambiteoInvitacionesList onAddPress={() => navigation.navigate('InvitarAmigosCrearGambiteo')} />
            <Divider />
            <GambiteoPresetsBotonera
                disabledPresets={disabledPresets}
                onCreatePreset={(presetId) => {
                    Keyboard.dismiss()
                    navigation.navigate('CrearCampo', { preset: getPreset(presetId) })
                }}
                onCustomPresset={() => {
                    Keyboard.dismiss()
                    navigation.navigate('CrearCampo')
                }}
            />
            <Divider />
            <Text style={{ marginHorizontal: 15, marginTop: 10, marginBottom: 5 }} appearance="hint" category="label">Campos:</Text>
        </>
    )

    return (
        <>
            <ScreenLayout>
                <TopNavigationSimpleForm navigation={navigation} onSave={submitCreacion} disabled={!valido} />

                <List
                    data={campos}
                    keyExtractor={(item, index) => item?.asunto?.concat(index)}
                    renderItem={({ item }) =>
                        <Campo
                            campo={item}
                            onEditPress={() => editCampoHandler(item)}
                            onDeletePress={() => removeCampoHandler(item)}
                        />
                    }
                    ListHeaderComponent={listHeader}
                    ItemSeparatorComponent={Divider}
                    ListFooterComponent={ListFooter}
                />
            </ScreenLayout>
        </>
    );
}

const style = StyleSheet.create({
    nuevoCampoButton: {
        marginHorizontal: 10,
        marginBottom: 10,
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
})

export default CrearGambiteoScreen;