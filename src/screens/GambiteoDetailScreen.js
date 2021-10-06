import { Divider, List, useTheme } from '@ui-kitten/components';
import React, { useEffect } from 'react';
import { RefreshControl, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ScreenLayout from '../components/layout/ScreenLayout';
import TopNavigationGambiteoDetail from '../components/navigation/TopNavigationGambiteoDetail';
import { fetchGambiteo } from '../store/slices/gambiteoSlice';
import Campo from './../components/campos/Campo';
import useListRefresh from './../hooks/useListRefresh';
import useNavigationEvents from './../hooks/useNavigationEvents';

const GambiteoDetailScreen = ({ navigation, route }) => {
    const dispatch = useDispatch()
    const theme = useTheme()

    const gid = route.params.gid

    const { refresh, refreshing } = useListRefresh(() => dispatch(fetchGambiteo(gid)))

    const gambiteo = useSelector(state => state.gambiteo.gambiteos[gid])

    useNavigationEvents({
        focus: async () => {
            await dispatch(fetchGambiteo({ id: gid }))
        },
    }, navigation)

    // Controlar si borran el gambiteo mientras estamos en esta pantalla
    useEffect(() => {
        if (!gambiteo) {
            // TODO Mostrar una alerta o algo para informar al usuario o algo
            navigation.navigate('Gambiteos')
        }
    }, [gambiteo])

    return (
        <>
            <ScreenLayout>
                <TopNavigationGambiteoDetail navigation={navigation} gambiteo={gambiteo} />
                <List
                    data={gambiteo?.campos}
                    refreshControl={
                        <RefreshControl
                            colors={[theme['color-primary-500']]}
                            onRefresh={refresh}
                            refreshing={refreshing}
                        />
                    }
                    keyExtractor={(item, index) => item?.asunto?.concat(index)}
                    renderItem={({ item }) => <Campo gambiteoId={gid} campo={item} />}
                    ItemSeparatorComponent={Divider}
                />
            </ScreenLayout>
        </>
    );
}

const style = StyleSheet.create({

})

export default GambiteoDetailScreen;