import { StyleService, useStyleSheet } from '@ui-kitten/components';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const ScreenLayout = (props) => {
    const styles = useStyleSheet(themedStyles);

    const { style, centerHorizontal, centerVertical } = props

    const stylesArray = [styles.container]
    if (centerHorizontal) {
        stylesArray.push(styles.centerHorizontal)
    }
    if (centerVertical) {
        stylesArray.push(styles.centerVertical)
    }
    stylesArray.push(style)

    return (
        <SafeAreaView style={stylesArray}>
            {props.children}
        </SafeAreaView>
    );
}

const themedStyles = StyleService.create({
    container: {
        flex: 1,
        backgroundColor: 'background-basic-color-1',
    },
    centerHorizontal: {
        alignItems: 'center',
    },
    centerVertical: {
        justifyContent: 'center',
    }
});

export default ScreenLayout;