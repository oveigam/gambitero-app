import React from 'react';
import { Icon, TopNavigationAction, useTheme } from '@ui-kitten/components';

const BackIcon = (props) => {
    const theme = useTheme()

    return <Icon {...props} fill={theme['color-primary-500']} name='arrow-back' />
}

const BackAction = ({ navigation }) => (
    <TopNavigationAction icon={BackIcon} onPress={navigation.goBack} />
)

export default BackAction;