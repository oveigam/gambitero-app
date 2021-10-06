import React, { useEffect } from 'react';
import { FlatList, Image, RefreshControl, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Gambiteo from '../components/Gambiteo';
import ListFooter from '../components/ListFooter';
import { fetchGambiteos, limpiarCreacionGambiteo } from '../store/slices/gambiteoSlice';
import useListRefresh from './../hooks/useListRefresh';
import TopNavigationGambiteos from '../components/navigation/TopNavigationGambiteos';
import ScreenLayout from '../components/layout/ScreenLayout';
import { List, useTheme, Divider } from '@ui-kitten/components';

const GambiteosScreen = ({ navigation }) => {
    const theme = useTheme()
    const dispatch = useDispatch()

    const { refresh, refreshing } = useListRefresh(() => dispatch(fetchGambiteos()))

    const feed = useSelector(state => Object.values(state.gambiteo.gambiteos).sort((a, b) => a.updatedAt < b.updatedAt))

    return (
        <ScreenLayout>
            <TopNavigationGambiteos navigation={navigation} />
            <List
                contentContainerStyle={{ flexGrow: 1 }}
                data={feed}
                refreshControl={
                    <RefreshControl
                        colors={[theme['color-primary-500']]}
                        onRefresh={refresh}
                        refreshing={refreshing}
                    />
                }
                renderItem={({ item }) =>
                    <Gambiteo
                        gambiteo={item}
                        onPress={() => navigation.navigate('Details', { gid: item.id })}
                        onChatPress={() => navigation.navigate('ChatGambiteo', { gid: item.id })}
                    />
                }
                ItemSeparatorComponent={Divider}
                ListFooterComponent={() => <ListFooter />}
                ListEmptyComponent={() =>
                    <View style={styles.emptyContainer}>
                        <Image style={styles.logoEmpty} source={require('../../assets/logo-complete.png')} resizeMode="center" />
                    </View>
                }
            />
        </ScreenLayout>
    );
}

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
    emptyContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    logoEmpty: {
        tintColor: 'gray',
        height: '100%',
        opacity: 0.1
    }
})

export default GambiteosScreen;