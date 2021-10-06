import React from 'react';
import { View } from 'react-native';

const ListFooter = (props) => {
    return <View style={{ height: props.size ? props.size : 80 }} />
}

export default ListFooter;