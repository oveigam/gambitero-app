import { Button } from '@ui-kitten/components';
import React, { useEffect, useRef, useState } from 'react';
import { Modal, StyleSheet, View, Image, BackHandler } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import useLocation from './../../hooks/useLocation';

export const DEFAULT_LOCATION = {
    latitude: 43.37135,
    longitude: -8.396,
    latitudeDelta: 0.01,
    longitudeDelta: 0.008,
}

const LocationPicker = ({ visible, onClose, onSelection, usesLocation }) => {

    const getLocation = useLocation()

    const [region, setRegion] = useState(DEFAULT_LOCATION)

    useEffect(() => {
        if (usesLocation) {
            const setRegionAsync = async () => {
                const location = await getLocation()
                setRegion(prevRegion => ({ ...prevRegion, ...location }))
            }
            setRegionAsync()
        }
    }, [visible, usesLocation])

    const submitHandler = () => {
        if (onSelection) {
            onSelection({
                latitude: region.latitude,
                longitude: region.longitude
            })
        }
        onClose()
    }

    return (
        <Modal visible={visible} onRequestClose={onClose}>
            <MapView
                style={styles.map}
                region={region}
                onRegionChangeComplete={(newRegion) => {
                    if (newRegion.latitude.toFixed(6) !== region.latitude.toFixed(6)
                        && newRegion.longitude.toFixed(6) !== region.longitude.toFixed(6)) {
                        setRegion(newRegion)
                    }
                }}
            />
            <View style={styles.fakeMarkerContainer}>
                <Image style={styles.marker} source={require('../../../assets/marker.webp')} />
            </View>
            <View style={styles.mapOverlay}>
                <Button style={{ marginBottom: '33%' }} onPress={submitHandler}>Aceptar</Button>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    mapOverlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    fakeMarkerContainer: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center'
    },
    marker: {
        width: 50,
        height: 50,
        marginBottom: 25
    }
})

export default LocationPicker;