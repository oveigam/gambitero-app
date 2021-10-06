import React from 'react';
import { View } from 'react-native';
import { StyleService, Text, useStyleSheet } from '@ui-kitten/components';

const Badge = ({ children }) => {
    const styles = useStyleSheet(themedStyles)

    return (
        <View style={styles.badge}>
            <Text style={styles.badgeText}>{children}</Text>
        </View>
    );
}

const themedStyles = StyleService.create({
    badge: {
        position: 'absolute',
        top: 5,
        right: 5,
        color: 'white',
        fontWeight: 'bold',
        backgroundColor: 'color-success-500',
        borderRadius: 99,
        padding: 2,
    },
    badgeText: {
        fontSize: 9,
        lineHeight: 11,
        color: 'white',
        textAlignVertical: 'center',
        textAlign: 'center',
    },
});

export default Badge;