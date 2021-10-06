import { TopNavigation } from '@ui-kitten/components';
import React from 'react';
import BackAction from './navigationActions/BackAction';

const TopNavigationSimpleBack = ({ navigation }) => {
    return (
        <TopNavigation
            accessoryLeft={() => <BackAction navigation={navigation} />}
        />
    );
}

export default TopNavigationSimpleBack