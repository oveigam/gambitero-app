import { Avatar, Button, Icon, MenuItem, OverflowMenu, Text, TopNavigation, TopNavigationAction, useTheme } from '@ui-kitten/components';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { edicionGambiteo } from '../../store/slices/gambiteoSlice';
import useLoading from './../../hooks/useLoading';
import { eliminarGambiteo } from './../../store/slices/gambiteoSlice';
import BackAction from './navigationActions/BackAction';

const Header = ({ titulo, img, participantes, onChatPress }) => {

    const imgSrc = img ? { uri: img } : require('../../../assets/images/gambiteo_placeholder.png')

    return (
        <View style={styles.header}>
            <Avatar
                style={[styles.image, !img && styles.noImage]}
                source={imgSrc}
            />
            <View style={styles.headerTexts}>
                <Text status="primary" category="p1">{titulo}</Text>
                <Text category="c1" appearance="hint" numberOfLines={1} >{participantes?.map(p => p.nombre).join(', ')}</Text>
            </View>
            <Button
                style={{ marginLeft: 5 }}
                appearance="ghost"
                accessoryLeft={({ style }) => <Icon style={[style, { marginHorizontal: 0 }]} name="message-square-outline" />}
                onPress={onChatPress}
            />
        </View>
    )
}

const MenuIcon = (props) => {
    const theme = useTheme()

    return <Icon {...props} fill={theme['color-primary-500']} name='more-vertical' />
}

const AgregarAmigosIcon = (props) => (
    <Icon {...props} name='person-add-outline' />
)

const EditarIcon = (props) => (
    <Icon {...props} name='edit-outline' />
)

const DeleteIcon = (props) => (
    <Icon {...props} name='trash-2-outline' />
)

const Menu = ({ navigation, gambiteo }) => {
    const dispatch = useDispatch()

    const { setLoading } = useLoading()

    const uid = useSelector(state => state.user.uid)
    const [menuVisible, setMenuVisible] = useState(false)

    return (
        <>
            <OverflowMenu
                anchor={() => <TopNavigationAction icon={MenuIcon} onPress={() => setMenuVisible(true)} />}
                visible={menuVisible}
                onBackdropPress={() => setMenuVisible(false)}
            >
                <MenuItem
                    accessoryLeft={AgregarAmigosIcon}
                    title='Agregar amigos'
                    onPress={() => {
                        console.log('TODO!! no se que carajo hacer con esto')
                    }}
                />
                {
                    gambiteo.propietario === uid &&
                    <>
                        <MenuItem
                            accessoryLeft={EditarIcon}
                            title='Editar'
                            onPress={() => {
                                setMenuVisible(false)
                                dispatch(edicionGambiteo(gambiteo))
                                navigation.navigate('New')
                            }}
                        />
                        <MenuItem
                            accessoryLeft={DeleteIcon}
                            title='Borrar'
                            onPress={async () => {
                                setMenuVisible(false)
                                setLoading(true)
                                await dispatch(eliminarGambiteo({ gambiteoId: gambiteo.id }))
                                setLoading(false)
                                navigation.navigate('Gambiteos', { edition: true })
                            }}
                        />
                    </>
                }
            </OverflowMenu>
        </>
    )
};

const TopNavigationGambiteoDetail = ({ navigation, gambiteo }) => {

    return (
        <TopNavigation
            accessoryLeft={() => <BackAction navigation={navigation} />}
            accessoryRight={() => <Menu navigation={navigation} gambiteo={gambiteo} />}
            title={() => (
                <Header
                    titulo={gambiteo?.titulo}
                    img={gambiteo?.img}
                    participantes={gambiteo?.participantes}
                    onChatPress={() => {
                        if (gambiteo) {
                            navigation.navigate('ChatGambiteo', { gid: gambiteo?.id })
                        }
                    }}
                />
            )}
        />
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    image: {
        marginRight: 16,
        marginLeft: 8,
    },
    noImage: {
        tintColor: 'grey',
        opacity: 0.3
    },
    headerTexts: {
        flex: 1,
        justifyContent: 'center'
    }
})

export default TopNavigationGambiteoDetail;