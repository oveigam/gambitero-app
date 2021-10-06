import React from 'react';
import { useSelector } from 'react-redux';
import AuthNavigator from '../navigation/AuthNavigator';
import RootNavigator from '../navigation/RootNavigator';

const StartUpScreen = () => {
    const refreshToken = useSelector(state => state.auth.refreshToken);

    if (refreshToken) {
        return <RootNavigator />
    } else {
        return <AuthNavigator />
    }
}

export default StartUpScreen;