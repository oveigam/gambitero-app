import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AmigosScreen from './../screens/AmigosScreen';

const Stack = createStackNavigator();

const AmigosStackNavigator = (props) => {

    return (
        <Stack.Navigator
            initialRouteName="Amigos"
            headerMode="none"
        >
            <Stack.Screen
                name="Amigos"
                component={AmigosScreen}
            />
        </Stack.Navigator>
    );
}

export default AmigosStackNavigator;