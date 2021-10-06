import React from 'react';
import { Icon, TopNavigationAction, useTheme } from '@ui-kitten/components';

const SaveIcon = (props) => {
    const theme = useTheme()

    return <Icon {...props} fill={theme['color-primary-500']} name='save-outline' />
}

const SaveIconDisabled = (props) => <Icon {...props} name='save-outline' />

const SaveAction = ({ onSave, disabled }) => (
    <TopNavigationAction
        icon={disabled ? SaveIconDisabled : SaveIcon}
        onPress={onSave}
        disabled={disabled}
    />
)

export default SaveAction;