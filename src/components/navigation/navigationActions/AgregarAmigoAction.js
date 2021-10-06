import { Icon, TopNavigationAction, useTheme } from '@ui-kitten/components';
import React from 'react';

const PersonPlusIcon = (props) => {
    const theme = useTheme()

    return <Icon {...props} fill={theme['color-primary-500']} name='person-add-outline' />
}

const AgregarAmigoAction = ({ onAddPress }) => {

    return (
        <TopNavigationAction
            icon={PersonPlusIcon}
            onPress={onAddPress}
        />
    )
}

export default AgregarAmigoAction