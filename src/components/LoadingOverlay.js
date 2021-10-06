import { Spinner } from '@ui-kitten/components';
import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import useLoading from './../hooks/useLoading';

const LoadingOverlay = (props) => {

    const { loading } = useLoading();

    return (
        <React.Fragment>
            {props.children}
            {
                loading &&
                <TouchableWithoutFeedback>
                    <View style={styles.loading}>
                        <Spinner size="giant" />
                    </View>
                </TouchableWithoutFeedback>
            }
        </React.Fragment>
    );
}

const styles = StyleSheet.create({
    loading: {
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default LoadingOverlay;