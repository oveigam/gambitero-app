import { Button, Input } from '@ui-kitten/components';
import React, { useState } from 'react';
import { Image, Keyboard, StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import ScreenLayout from '../../components/layout/ScreenLayout';
import useLoading from '../../hooks/useLoading';
import { signUp } from '../../store/slices/authSlice';

const SignUpScreen = ({ navigation }) => {
    const dispatch = useDispatch()
    const { loading, setLoading } = useLoading()

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')

    const disableSabed = !username || !email || !password || password !== passwordConfirm;

    const submitSignUp = async () => {
        if (!loading) {
            setLoading(true)
            Keyboard.dismiss()
            await dispatch(signUp({ username, email, password }))
            setLoading(false)
        }
    }

    return (
        <ScreenLayout centerVertical centerHorizontal>
            <View style={styles.content}>
                <View style={styles.logoContainer}>
                    <Image style={styles.logo} source={require('../../../assets/logo-complete.png')} />
                </View>
                <Input
                    style={styles.input}
                    label="Usuario"
                    value={username}
                    onChangeText={setUsername}
                    textContentType="username"
                    autoCapitalize="none"
                />
                <Input
                    style={styles.input}
                    label="Email"
                    value={email}
                    onChangeText={setEmail}
                    textContentType="emailAddress"
                    keyboardType="email-address"
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
                <Input
                    style={styles.input}
                    label="Confirmar contraseña"
                    value={passwordConfirm}
                    onChangeText={setPasswordConfirm}
                    textContentType="password"
                    secureTextEntry={true}
                    autoCapitalize="none"
                />
                <View style={styles.botonera}>
                    <Button style={styles.boton} disabled={disableSabed} mode="contained" onPress={submitSignUp} loading={loading}>REGISTRARSE</Button>
                    <Button appearance="ghost" onPress={navigation.goBack}>Cancelar</Button>
                </View>
            </View>
        </ScreenLayout>
    );
}

const styles = StyleSheet.create({
    content: {
        width: '85%',
    },
    input: {
        marginVertical: 10,
    },
    logoContainer: {
        height: '10%',
        alignItems: 'center',
    },
    logo: {
        height: '100%',
        resizeMode: 'center'
    },
    botonera: {
        paddingHorizontal: 25,
        marginTop: 10
    },
    boton: {
        marginVertical: 10,
    }
})
export default SignUpScreen;