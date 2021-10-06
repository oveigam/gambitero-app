import { Avatar, Divider, Icon, Input, Text, Toggle, useTheme } from '@ui-kitten/components';
import * as Picker from 'expo-image-picker';
import React, { useState } from 'react';
import { Keyboard, ScrollView, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import Collapsible from 'react-native-collapsible';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfile } from '../store/slices/userSlice';
import ScreenLayout from './../components/layout/ScreenLayout';
import TopNavigationSimpleForm from './../components/navigation/TopNavigationSimpleForm';
import useLoading from './../hooks/useLoading';
import { refreshAuthToken } from './../store/slices/authSlice';

const PerfilScreen = ({ navigation }) => {
    const theme = useTheme()
    const dispatch = useDispatch()

    const { setLoading } = useLoading()

    const [expandedNotificationConfig, setExpandedNotificationConfig] = useState(false)

    const profileName = useSelector(state => state.user.nombre)
    const profileImg = useSelector(state => state.user.img)
    const profileUsername = useSelector(state => state.user.username)
    const profileEmail = useSelector(state => state.user.email)
    const profileNotificacionesConfig = useSelector(state => state.user.notificacionesConfig)

    const [nombre, setNombre] = useState(profileName)
    const [img, setImg] = useState(profileImg)
    const [permisoNuevoGambiteo, setPermisoNuevoGambiteo] = useState(profileNotificacionesConfig?.nuevoGambiteo)
    const [permisoSolicitudAmistad, setPermisoSolicitudAmistad] = useState(profileNotificacionesConfig?.solicitudAmistad)
    const [permisoChat, setPermisoChat] = useState(profileNotificacionesConfig?.chat)

    const [imgUpload, setImgUpload] = useState()

    const avatar = img ? { uri: img } : require('../../assets/images/avatar.png')

    const pickImageHandler = async () => {
        const image = await Picker.launchImageLibraryAsync();
        if (!image.cancelled) {
            setImg(image.uri)
            const fileName = image.uri.replace(/^.*[\\\/]/, '');
            const type = image.type + '/' + fileName.substr(fileName.lastIndexOf('.') + 1);
            setImgUpload({
                uri: image.uri,
                type: type,
                name: fileName,
            })
        }
    }

    const refreshToken = useSelector(state => state.auth.refreshToken)

    const submit = async () => {
        Keyboard.dismiss()

        const form = new FormData();
        form.append('nombre', nombre)
        form.append('img', imgUpload)
        form.append('permisoNuevoGambiteo', permisoNuevoGambiteo)
        form.append('permisoSolicitudAmistad', permisoSolicitudAmistad)
        form.append('permisoChat', permisoChat)

        setLoading(true)

        // Actualizamos el jwt token preventivamente porque, en heroku, si esta caducado, 
        // falla la subida de imagenes y se corta la conexion antes de que pueda refrescarse automaticamente
        await dispatch(refreshAuthToken({ refreshToken }))

        await dispatch(updateUserProfile(form))

        setLoading(false)
        navigation.goBack()
    }

    const hayCambios = nombre !== profileName ||
        !!imgUpload ||
        permisoNuevoGambiteo !== profileNotificacionesConfig?.nuevoGambiteo ||
        permisoSolicitudAmistad !== profileNotificacionesConfig?.solicitudAmistad ||
        permisoChat !== profileNotificacionesConfig?.chat

    return (
        <ScreenLayout>
            <TopNavigationSimpleForm navigation={navigation} onSave={submit} disabled={!hayCambios} />
            <ScrollView>
                <>
                    <View style={styles.cabecera} >

                        <View style={styles.avatarContainer}>
                            <TouchableWithoutFeedback onPress={pickImageHandler}>
                                <Avatar style={styles.avatar} source={avatar} />
                            </TouchableWithoutFeedback>
                        </View>

                        <View style={styles.cabeceraTexts}>
                            <Input
                                style={styles.input}
                                label="Nombre"
                                value={nombre}
                                onChangeText={text => setNombre(text)}
                            />
                            <Input
                                style={styles.input}
                                disabled
                                label="Username"
                                value={profileUsername}
                            />
                            <Input
                                style={styles.input}
                                disabled
                                label="Email"
                                value={profileEmail}
                            />
                        </View>

                    </View>
                    <Divider style={{ marginVertical: 5 }} />
                    <View style={styles.desplegable}>
                        <TouchableOpacity onPress={() => setExpandedNotificationConfig(prev => !prev)} >
                            <View style={styles.cabeceraDesplegable}>
                                <Text style={styles.notificacionesTitle} status="primary" >Notificaciones</Text>
                                <Icon style={styles.icon} fill={theme['color-primary-500']} name={!expandedNotificationConfig ? 'chevron-down-outline' : 'chevron-up-outline'} />
                            </View>
                        </TouchableOpacity>
                        <Collapsible collapsed={!expandedNotificationConfig} >

                            <View style={styles.setting}>
                                <Text style={styles.settingTitle}>Nuevos gambiteos</Text>
                                <Toggle style={styles.settingToggle} checked={permisoNuevoGambiteo} onChange={setPermisoNuevoGambiteo} />
                            </View>

                            <View style={styles.setting}>
                                <Text style={styles.settingTitle}>Solicitudes de amistad</Text>
                                <Toggle style={styles.settingToggle} checked={permisoSolicitudAmistad} onChange={setPermisoSolicitudAmistad} />
                            </View>

                            <View style={styles.setting}>
                                <Text style={styles.settingTitle}>Chats</Text>
                                <Toggle style={styles.settingToggle} checked={permisoChat} onChange={setPermisoChat} />
                            </View>

                        </Collapsible>
                    </View>
                </>
            </ScrollView>
        </ScreenLayout>
    );
}

const styles = StyleSheet.create({
    cabecera: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        marginBottom: 10
    },
    avatarContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatar: {
        width: 120,
        height: 120
    },
    cabeceraTexts: {
        flex: 1,
        marginLeft: 10
    },
    input: {
        marginTop: 10,
    },
    desplegable: {
        padding: 10,
    },
    cabeceraDesplegable: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    icon: {
        width: 32,
        height: 32,
        marginHorizontal: 10,
    },
    notificacionesTitle: {
        fontWeight: 'bold',
        flex: 1,
    },
    setting: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
        marginLeft: 10
    },
    settingTitle: {
        flex: 1.5,
    },
    settingToggle: {
        flex: 1,
        justifyContent: 'flex-start'
    }
})

export default PerfilScreen;