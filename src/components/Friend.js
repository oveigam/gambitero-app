import { Avatar, Button, Icon, MenuItem, OverflowMenu, Spinner, Text, useTheme } from '@ui-kitten/components';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { acceptAmigo, blockAmigo, deleteAmigo, fetchAmigos, rejectAmigo, unblockAmigo } from './../store/slices/amigosSlice';

const Friend = ({ status, uid, nombre, username, img }) => {
    const theme = useTheme()
    const dispatch = useDispatch()

    const [loading, setLoading] = useState(false)
    const [menuVisible, setMenuVisible] = useState(false)

    const dispatchAction = async (action) => {
        setLoading(true)
        setMenuVisible(false)

        switch (action) {
            case 'aceptar':
                await dispatch(acceptAmigo({ amigoId: uid }))
                break;
            case 'rechazar':
                await dispatch(rejectAmigo({ amigoId: uid }))
                break;
            case 'borrar':
                await dispatch(deleteAmigo({ amigoId: uid }))
                break;
            case 'bloquear':
                await dispatch(blockAmigo({ amigoId: uid }))
                break;
            case 'desbloquear':
                await dispatch(unblockAmigo({ amigoId: uid }))
                break;
            default:
                break;
        }
        setLoading(false)
        dispatch(fetchAmigos()) //TODO mejorable, en las peticiones de modificacion que devuelva el amigo modificado y cambiar solo ese
    }

    const imgSrc = img ? { uri: img } : require('../../assets/images/avatar.png')

    return (
        <View style={styles.item}>
            <Avatar style={{marginLeft: 15}} source={imgSrc} size="giant" />
            <View style={styles.text}>
                <Text status="primary" category="h6" numberOfLines={1} >{nombre}</Text>
                <Text category="c1" appearance="hint">@{username}</Text>
            </View>
            {
                loading &&
                <View style={styles.loadingContainer}>
                    <Spinner size="small" />
                </View>
            }
            {
                (status && status !== 'waiting' && !loading) &&
                <OverflowMenu
                    anchor={() =>
                        <Button
                            appearance="ghost"
                            status="basic"
                            accessoryLeft={(props) => <Icon {...props} name='more-vertical' />}
                            onPress={() => setMenuVisible(true)}
                        />
                    }
                    visible={menuVisible}
                    onBackdropPress={() => setMenuVisible(false)}
                >
                    {
                        status === 'pending' &&
                        <>
                            <MenuItem title="Aceptar" onPress={() => dispatchAction('aceptar')} />
                            <MenuItem title="Rechazar" onPress={() => dispatchAction('rechazar')} />
                        </>
                    }
                    {
                        status === 'accepted' &&
                        <>
                            <MenuItem title="Borrar" onPress={() => dispatchAction('borrar')} />
                        </>
                    }
                    {
                        status === 'blocked' ?
                            <MenuItem
                                title={(props) => {
                                    props.style.push({ color: theme['color-info-500'] })
                                    return <Text {...props} status="danger" >Desbloquear</Text>
                                }}
                                onPress={() => dispatchAction('desbloquear')} />
                            :
                            <MenuItem
                                title={(props) => {
                                    props.style.push({ color: theme['color-danger-500'] })
                                    return <Text {...props} status="danger" >Bloquear</Text>
                                }}
                                onPress={() => dispatchAction('bloquear')}
                            />
                    }
                </OverflowMenu>
            }
        </View>
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
    },
    loadingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 20
    }
})

export default Friend;