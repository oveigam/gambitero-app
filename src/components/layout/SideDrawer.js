import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Button, Divider, Drawer, DrawerItem, Icon, IndexPath, Text, useTheme } from '@ui-kitten/components';
import React from 'react';
import { ImageBackground, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import { VERSION_DEV } from '../../util/Constants';

const Header = (props) => {

    const profileImg = useSelector(state => state.user.img)
    const profileName = useSelector(state => state.user.nombre)
    const profileUsername = useSelector(state => state.user.username)

    const avatar = profileImg ? { uri: profileImg } : require('../../../assets/images/background.png')

    const noImageStyle = profileImg ? {} : {}

    return (
        <>
            <TouchableOpacity activeOpacity={0.85} onPress={() => props.navigation.navigate('Perfil')}>
                <ImageBackground
                    style={[props.style, styles.header, noImageStyle]}
                    source={avatar}
                />
            </TouchableOpacity>
            <Divider />
            <View style={styles.subheader}>
                <View style={styles.userInfo}>
                    <Text status="primary" category="h5">{profileName}</Text>
                    <Text category="c2">@{profileUsername}</Text>
                </View>
                <Button
                    style={styles.settings}
                    appearance="ghost"
                    accessoryLeft={(props) => <Icon {...props} name="settings-2-outline" />}
                    onPress={() => { props.navigation.navigate('Perfil') }}
                />
            </View>
            <Divider />
        </>
    )
}

const Footer = () => {
    const dispatch = useDispatch()

    return (
        <>
            <Divider />
            <View style={styles.footer}>
                <Text style={styles.version} category="label" appearance="hint">v{VERSION_DEV}</Text>
                <Button
                    appearance="ghost"
                    accessoryLeft={({ style }) => <Icon style={[style, { marginHorizontal: 0 }]} name="log-out-outline" />}
                    onPress={() => dispatch(logout())}
                >
                    SALIR
                </Button>
            </View>
        </>
    )
}

const ForwardIcon = (props) => (
    <Icon {...props} name='arrow-ios-forward' />
);

const SideDrawer = ({ state, navigation }) => {
    const theme = useTheme()

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme['background-basic-color-1'] }}>
            <Drawer
                header={() => <Header navigation={navigation} />}
                footer={Footer}
                selectedIndex={new IndexPath(state.index)}
                onSelect={index => navigation.navigate(state.routeNames[index.row])}
            >
                <DrawerItem
                    title="Gambiteos"
                    accessoryLeft={({ style }) => <MaterialCommunityIcons style={styles.drawerItemIcon} name="glass-cocktail" color={style.tintColor} size={style.width} />}
                    accessoryRight={ForwardIcon}
                />
                <DrawerItem
                    title="Amigos"
                    accessoryLeft={(props) => <Icon {...props} name="people-outline" />}
                    accessoryRight={ForwardIcon}
                />
            </Drawer>
        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    header: {
        height: 200,
        flexDirection: 'row',
        alignItems: 'center',
    },
    subheader: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    userInfo: {
        marginVertical: 13,
        alignItems: 'flex-end',
    },
    settings: {
        width: 15,
        height: 15,
        margin: 10
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    version: {
        marginHorizontal: 15
    },
    drawerItemIcon: {
        marginHorizontal: 8
    }
});

export default SideDrawer;