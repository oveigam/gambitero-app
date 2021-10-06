import { Avatar, Icon, MenuItem, OverflowMenu, Text, TopNavigation, TopNavigationAction, useTheme } from '@ui-kitten/components';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { silenciarChat } from '../../store/slices/chatSlice';
import BackAction from './navigationActions/BackAction';


const Header = ({ titulo, img, participantes }) => {

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
        </View>
    )
}

const MenuIcon = (props) => {
    const theme = useTheme()

    return <Icon {...props} fill={theme['color-primary-500']} name='more-vertical' />
}

const Menu = ({ silenced, gid }) => {
    const dispatch = useDispatch()

    const [menuVisible, setMenuVisible] = useState(false)

    return (
        <>
            <OverflowMenu
                anchor={() => <TopNavigationAction icon={MenuIcon} onPress={() => setMenuVisible(true)} />}
                visible={menuVisible}
                onBackdropPress={() => setMenuVisible(false)}
            >
                {
                    silenced ?
                        <MenuItem
                            title='Cancelar silencio'
                            onPress={() => {
                                setMenuVisible(false)
                                dispatch(silenciarChat({ gid, tiempo: '0' }))
                            }}
                        />
                        :
                        <>
                            <MenuItem
                                title='Silenciar 8 hora'
                                onPress={() => {
                                    setMenuVisible(false)
                                    dispatch(silenciarChat({ gid, tiempo: '8h' }))
                                }}
                            />
                            <MenuItem
                                title='Silenciar una semana'
                                onPress={async () => {
                                    setMenuVisible(false)
                                    dispatch(silenciarChat({ gid, tiempo: '1week' }))
                                }}
                            />
                            <MenuItem
                                title='Silenciar indefinidamente'
                                onPress={async () => {
                                    setMenuVisible(false)
                                    dispatch(silenciarChat({ gid, tiempo: 'forever' }))
                                }}
                            />
                        </>
                }
            </OverflowMenu>
        </>
    )
}

const TopNavigationChat = ({ navigation, gid, silenced }) => {
    const gambiteo = useSelector(state => state.gambiteo.gambiteos[gid])

    return (
        <TopNavigation
            accessoryLeft={() => <BackAction navigation={navigation} />}
            accessoryRight={() => <Menu navigation={navigation} gid={gid} silenced={silenced} />}
            title={() => (
                <Header
                    titulo={gambiteo?.titulo}
                    img={gambiteo?.img}
                    participantes={gambiteo?.participantes}
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

export default TopNavigationChat;