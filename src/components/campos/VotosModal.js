import React, { useRef, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Modal from 'react-native-modal';
import AmigoItem from './../AmigoItem';
import { Divider, Text, useTheme } from '@ui-kitten/components';

const VotosModal = ({ visible, onDismiss, votos }) => {
    const theme = useTheme()

    const scrollViewRef = useRef()

    const [scrollOffset, setScrollOffset] = useState()

    if (!votos || votos.length < 1 || !visible) return null

    const handleOnScroll = event => {
        setScrollOffset(event.nativeEvent.contentOffset.y)
    }

    const handleScrollTo = p => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo(p);
        }
    }

    return (
        <Modal
            style={styles.modal}
            avoidKeyboard
            hasBackdrop
            backdropOpacity={0.3}
            isVisible={visible}
            onBackdropPress={onDismiss}
            onBackButtonPress={onDismiss}
            onSwipeComplete={onDismiss}
            swipeDirection={['down']}
            scrollTo={handleScrollTo}
            scrollOffset={scrollOffset}
            scrollOffsetMax={400 - 300}
            propagateSwipe={true}
        >
            <View style={[styles.scrollableModal, { backgroundColor: theme['background-basic-color-1'] }]}>
                <Text style={styles.titulo} status="primary" category="h6">Votos: {votos.length}</Text>
                <Divider />
                <ScrollView
                    ref={scrollViewRef}
                    onScroll={handleOnScroll}
                    scrollEventThrottle={16}
                >
                    {
                        votos?.map((user) =>
                            <AmigoItem
                                key={user.id}
                                nombre={user.nombre}
                                username={user.username}
                                img={user.img}
                            />)
                    }
                </ScrollView>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    scrollableModal: {
        height: 300,
    },
    cabecera: {
        justifyContent: 'center',
        paddingVertical: 5
    },
    titulo: {
        fontWeight: 'bold',
        textAlign: 'center',
        paddingVertical: 5
    },
    botonera: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
})

export default VotosModal;