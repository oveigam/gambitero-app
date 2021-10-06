import React from 'react';
import { Icon, TopNavigationAction, useTheme } from '@ui-kitten/components';

const MenuIcon = (props) => {
    const theme = useTheme()

    return <Icon {...props} fill={theme['color-primary-500']} name='menu-outline' />
}

const DrawerAction = ({ navigation }) => (
    <TopNavigationAction icon={MenuIcon} onPress={navigation.openDrawer} />
)

export default DrawerAction;