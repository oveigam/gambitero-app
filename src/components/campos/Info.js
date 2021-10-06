import { Icon, Text, useTheme } from '@ui-kitten/components';
import React, { useCallback, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Collapsible from 'react-native-collapsible';
import formatValor from '../../util/formatValor';
import AccionesCampo from './AccionesCampo';

const Info = (props) => {
    const theme = useTheme()

    const [isCollapsed, setIsCollapsed] = useState(true)
    const [showSubheader, setShowSubheader] = useState(true)
    const [valorTruncado, setValorTruncado] = useState(false)

    const onTextLayout = useCallback(e => {
        setValorTruncado(e.nativeEvent.lines.length > 1);
    }, [])

    const { campo, onEditPress, onDeletePress } = props

    const valor = formatValor(campo.valores[0]?.valor, campo.tipoDato);

    return (
        <>
            <TouchableOpacity style={styles.item} disabled={!valorTruncado} onPress={() => setIsCollapsed(prev => !prev)}>
                <View style={styles.cabecera}>
                    <Icon style={styles.icon} fill={theme['color-primary-500']} name="info-outline" />
                    <Text
                        style={styles.asunto}
                        status="primary"
                    >
                        {campo.asunto}
                    </Text>
                    <AccionesCampo onEdit={onEditPress} onDelete={onDeletePress} />
                    {
                        valorTruncado &&
                        <Icon style={styles.icon} fill={theme['color-primary-500']} name={isCollapsed ? 'chevron-down-outline' : 'chevron-up-outline'} />
                    }
                </View>
                <Animatable.View
                    duration={!isCollapsed ? 100 : 300}
                    easing={isCollapsed ? 'ease-in' : 'ease-out'}
                    animation={isCollapsed ? 'zoomIn' : 'zoomOutDown'}
                    onAnimationEnd={() => {
                        if (!isCollapsed) {
                            setShowSubheader(false)
                        }
                    }}
                >
                    {
                        showSubheader &&
                        <Text style={styles.subCabecera} numberOfLines={1} onTextLayout={onTextLayout} >{valor}</Text>
                    }
                </Animatable.View>
            </TouchableOpacity>
            <Collapsible collapsed={isCollapsed} >
                <Animatable.View
                    duration={isCollapsed ? 100 : 200}
                    easing={!isCollapsed ? 'ease-in' : 'ease-out'}
                    animation={!isCollapsed ? 'zoomIn' : 'zoomOut'}
                    onAnimationEnd={() => {
                        if (isCollapsed) {
                            setShowSubheader(true)
                        }
                    }}
                >
                    <Text style={styles.valor}>{valor}</Text>
                </Animatable.View>
            </Collapsible>
        </>
    );
}

const styles = StyleSheet.create({
    item: {
        padding: 10,
    },
    icon: {
        width: 32,
        height: 32,
        marginHorizontal: 10,
    },
    cabecera: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    subCabecera: {
        marginHorizontal: 10,
        marginTop: 10
    },
    asunto: {
        fontWeight: 'bold',
        flex: 1
    },
    valor: {
        marginHorizontal: 10,
        paddingHorizontal: 10,
        marginBottom: 10
    }
})

export default Info;