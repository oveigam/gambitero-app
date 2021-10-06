import { Button, Input } from '@ui-kitten/components';
import React, { useState } from 'react';
import { Image, Keyboard, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/slices/authSlice';
import ScreenLayout from '../../components/layout/ScreenLayout';
import useLoading from './../../hooks/useLoading';

const LoginScreen = ({ navigation }) => {
    const dispatch = useDispatch()

    const { setLoading } = useLoading()

    const [usernameOrEmail, setUsernameOrEmail] = useState('')
    const [password, setPassword] = useState('')


    const loading = useSelector(({ auth }) => auth.loading)

    const onLoginClick = async () => {
        if (!loading) {
            Keyboard.dismiss()
            setLoading(true)
            await dispatch(login({ usernameOrEmail, password }))
            setLoading(false)
        }
    }

    return (
        <ScreenLayout centerHorizontal centerVertical >
            <View style={styles.content}>
                <View style={styles.logoContainer}>
                    <Image style={styles.logo} source={require('../../../assets/logo-complete.png')} />
                </View>
                <Input
                    style={styles.input}
                    label="Usuario o email"
                    value={usernameOrEmail}
                    onChangeText={setUsernameOrEmail}
                    autoCapitalize="none"
                />
                <Input
                    style={styles.input}
                    label="Contraseña"
                    value={password}
                    onChangeText={setPassword}
                    textContentType="password"
                    secureTextEntry={true}
                    autoCapitalize="none"
                />
                <View style={styles.botonera}>
                    <Button style={styles.boton} onPress={onLoginClick} loading={loading}>ENTRAR</Button>
                    <Button
                        appearance="ghost"
                        onPress={() => {
                            Keyboard.dismiss()
                            navigation.navigate("SignUp")
                        }}
                    >
                        Aún no tienes cuenta? Regístrate!
                    </Button>
                </View>
            </View>
        </ScreenLayout>
    );
}

const styles = StyleSheet.create({
    content: {
        width: '85%',
    },
    logoContainer: {
        width: '100%',
        height: '30%',
        alignItems: 'center',
        marginBottom: 5
    },
    logo: {
        width: '50%',
        height: '100%',
        resizeMode: 'center'
    },
    input: {
        marginVertical: 10,
    },
    botonera: {
        paddingHorizontal: 25,
        marginTop: 10
    },
    boton: {
        marginVertical: 10,
    }
})

export default LoginScreen;