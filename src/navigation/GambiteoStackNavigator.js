import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import CrearCampoGambiteoScreen from './../screens/CrearCampoGambiteoScreen';
import CrearGambiteoScreen from './../screens/CrearGambiteoScreen';
import GambiteoChatScreen from './../screens/GambiteoChatScreen';
import GambiteoDetailScreen from './../screens/GambiteoDetailScreen';
import GambiteosScreen from './../screens/GambiteosScreen';
import PerfilScreen from './../screens/PerfilScreen';
import InvitarAmigosCrearGambiteoScreen from './../screens/InvitarAmigosCrearGambiteoScreen';

const { Navigator, Screen } = createStackNavigator();

const GamiteoStackNavigator = (props) => {
    return (
        <Navigator
            initialRouteName="Gambiteos"
            headerMode="none"
        >
            <Screen
                name="Gambiteos"
                component={GambiteosScreen}
            />
            <Screen
                name="Details"
                component={GambiteoDetailScreen}
            />
            <Screen
                name="New"
                component={CrearGambiteoScreen}
                options={{ headerTitle: '', cancel: true }}
            />
            <Screen 
                name="InvitarAmigosCrearGambiteo"
                component={InvitarAmigosCrearGambiteoScreen}
            />
            <Screen
                name="CrearCampo"
                component={CrearCampoGambiteoScreen}
                options={() => ({ headerTitle: '' })}
            />
            <Screen
                name="ChatGambiteo"
                component={GambiteoChatScreen}
                options={() => ({ headerTitle: '' })}
            />
            <Screen
                name="Perfil"
                component={PerfilScreen}
                options={() => ({ headerTitle: '' })}
            />
        </Navigator>
    );
}

export default GamiteoStackNavigator;