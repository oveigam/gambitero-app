import { Button } from '@ui-kitten/components';
import React from 'react';
import { View } from 'react-native';
import Badge from './Badge';

const IconBadge = (props) => {

    const { icon, count, onPress, style } = props

    const showBadge = (!!count && count > 0)

    return (
        <View style={style}>
            <Button
                appearance="ghost"
                accessoryLeft={icon}
                onPress={onPress}
            />
            {
                showBadge &&
                <Badge>{count}</Badge>
            }
        </View>
    );
}

export default IconBadge;