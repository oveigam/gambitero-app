import { Icon, TopNavigationAction, useTheme } from '@ui-kitten/components';
import React from 'react';
import { useDispatch } from 'react-redux';
import { limpiarCreacionGambiteo } from '../../../store/slices/gambiteoSlice';


const PlusIcon = (props) => {
    const theme = useTheme()

    return <Icon {...props} fill={theme['color-primary-500']} name='plus-circle-outline' />
}

const NuevoGambiteoAction = ({ navigation }) => {
    const dispatch = useDispatch()

    return (
        <TopNavigationAction
            icon={PlusIcon}
            onPress={() => {
                dispatch(limpiarCreacionGambiteo())
                navigation.navigate('New')
            }}
        />
    )
}

export default NuevoGambiteoAction