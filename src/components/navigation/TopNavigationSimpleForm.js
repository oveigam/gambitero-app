import { TopNavigation } from '@ui-kitten/components';
import React from 'react';
import BackAction from './navigationActions/BackAction';
import SaveAction from './navigationActions/SaveAction';

const TopNavigationSimpleForm = ({ navigation, onSave, disabled }) => {
    return (
        <TopNavigation
            accessoryLeft={() => <BackAction navigation={navigation} />}
            accessoryRight={() => <SaveAction onSave={onSave} disabled={disabled} />}
        />
    );
}

export default TopNavigationSimpleForm;