import { TopNavigation } from '@ui-kitten/components';
import React from 'react';
import DrawerAction from './navigationActions/DrawerAction';
import NuevoGambiteoAction from './navigationActions/NuevoGambiteoAction';

const TopNavigationGambiteos = ({ navigation }) => {
    return (
        <TopNavigation
            accessoryLeft={() => <DrawerAction navigation={navigation} />}
            accessoryRight={() => <NuevoGambiteoAction navigation={navigation} />}
        />
    );
}

export default TopNavigationGambiteos;