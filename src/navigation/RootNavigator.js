import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useRef } from 'react';
import SideDrawer from '../components/layout/SideDrawer';
import GamiteoStackNavigator from './GambiteoStackNavigator';
import AmigosStackNavigator from './AmigosStackNavigator';
import * as Notifications from 'expo-notifications';
import { allowsNotificationsAsync } from '../util/allowsNotificationsAsync';
import axios from 'axios';

const { Navigator, Screen } = createDrawerNavigator();

const navigationRef = React.createRef();

export function navigate(name, params) {
    navigationRef.current?.navigate(name, params);
}

const RootNavigator = props => {

    const responseListener = useRef();

    // Listener para gestionar al pulsar en una notificacion
    useEffect(() => {
        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            const data = response.notification.request.content.data;

            switch (data.type) {
                case 'chat':
                    navigate('ChatGambiteo', { gid: data.gid })
                    break;

                case 'gambiteo':
                    navigate('Details', { id: data.gid })
                    break;

                case 'amistad':
                    navigate('Amigos', { id: data.gid })
                    break;

                default:
                    break;
            }
        });

        return () => {
            Notifications.removeNotificationSubscription(responseListener);
        };
    }, [])

    // Obtenemos el pushToken y lo guardamos en la BBDD
    useEffect(() => {
        const setupPushToken = async () => {
            // Comprobamos si el user concedio permisos de notificaciones
            const permisoNotificaciones = await allowsNotificationsAsync()
            if (permisoNotificaciones) {
                const { data: expoToken } = await Notifications.getExpoPushTokenAsync()
                await axios.post('/users/pushToken', { pushToken: expoToken })
            } else {
                await axios.delete('/users/pushToken')
            }
        }
        setupPushToken()
    }, [])

    return (
        <NavigationContainer ref={navigationRef}>
            <Navigator drawerContent={props => <SideDrawer {...props} />}>
                <Screen name="Gambiteos" component={GamiteoStackNavigator} />
                <Screen name="Amigos" component={AmigosStackNavigator} />
            </Navigator>
        </NavigationContainer>
    );
}

export default RootNavigator;