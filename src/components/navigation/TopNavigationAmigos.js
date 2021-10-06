import { TopNavigation } from '@ui-kitten/components';
import React from 'react';
import AgregarAmigoAction from './navigationActions/AgregarAmigoAction';
import DrawerAction from './navigationActions/DrawerAction';

const TopNavigationAmigos = ({ navigation, onAddPress }) => {
    return (
        <TopNavigation
            accessoryLeft={() => <DrawerAction navigation={navigation} />}
            accessoryRight={() => <AgregarAmigoAction onAddPress={onAddPress} />}
        />
    );
}

export default TopNavigationAmigos;