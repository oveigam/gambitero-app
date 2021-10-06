import * as eva from "@eva-design/eva";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import AppLoading from 'expo-app-loading';
import * as Notifications from 'expo-notifications';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider, useSelector } from 'react-redux';
import LoadingOverlay from './src/components/LoadingOverlay';
import axiosSetup from './src/config/axios-setup';
import { SocketProvider } from './src/contexts/SocketContext';
import useSocket from './src/hooks/useSocket';
import { default as theme } from './src/resources/theme.json';
import StartUpScreen from './src/screens/StartUpScreen';
import { refreshLogin, setToken } from './src/store/slices/authSlice';
import store from './src/store/store';
import { default as mapping } from './mapping.json';

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowAlert: true,
      shouldSetBadge: true,
    }
  }
})

// Metodo para inicializar los datos previos del usuario
const initConfig = async () => {

  // Gitanada para limpiar datos de la app rapido mientras debugeo, borrar o dejar comentado
  // await AsyncStorage.clear()

  // Configuracion de header e interceptores de axio (cliente http)
  axiosSetup(store)

  // Recuperamos los token de autenticacion guardados en el telefono
  const oldToken = await AsyncStorage.getItem('token');
  const refreshToken = await AsyncStorage.getItem('refreshToken');

  // Si tenemos tokens guardados en el telefono comenzamos el proceso de login automatico (mantener sesion abierta)
  if (oldToken && refreshToken) {

    // Cargamos los tokens antiguos en la store
    store.dispatch(setToken(oldToken))

    // Una vez tenemos los token viejos llamamos al server para refrescar el token de autenticacion y recuperar los datos de usuario
    await store.dispatch(refreshLogin({ refreshToken }))

  }
}

const WrappedApp = () => {
  const colorScheme = useColorScheme()
  const token = useSelector(state => state.auth.token)
  const socket = useSocket()

  const [dataLoaded, setDataLoaded] = useState(false)

  if (!dataLoaded || (!socket && token)) {
    return <AppLoading startAsync={initConfig} onFinish={() => setDataLoaded(true)} onError={error => console.log(error)} />
  }

  const evaTheme = colorScheme === 'dark' ? eva.dark : eva.light

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider
        {...eva}
        customMapping={mapping}
        theme={{ ...evaTheme, ...theme }}
      >
        <SafeAreaProvider>
          <LoadingOverlay>
            <StartUpScreen />
          </LoadingOverlay>
        </SafeAreaProvider>
      </ApplicationProvider>
    </>
  )

}

export default function App() {

  return (
    <Provider store={store}>
      <SocketProvider>
        <AppearanceProvider>
          <WrappedApp />
        </AppearanceProvider>
      </SocketProvider>
      <StatusBar style="auto" />
    </Provider>
  );
}