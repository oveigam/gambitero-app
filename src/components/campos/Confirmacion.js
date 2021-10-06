import { Icon, Text, Toggle, useTheme } from '@ui-kitten/components';
import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Collapsible from 'react-native-collapsible';
import { useDispatch, useSelector } from 'react-redux';
import { confirmar } from '../../store/slices/gambiteoSlice';
import formatValor from '../../util/formatValor';
import AccionesCampo from './AccionesCampo';
import ConfirmacionItem from './ConfirmacionItem';

const Confirmacion = (props) => {
    const theme = useTheme()
    const dispatch = useDispatch()

    const { gambiteoId, campo, onEditPress, onDeletePress } = props

    const editable = !!onEditPress || !!onDeletePress

    const [isCollapsed, setIsCollapsed] = useState(true)
    const [showSubheader, setShowSubheader] = useState(true)
    const [valorTruncado, setValorTruncado] = useState(false)

    const onTextLayout = useCallback(e => {
        setValorTruncado(e.nativeEvent.lines.length > 1);
    }, [])

    // Obtenemos los datos del campo
    const asunto = campo.asunto
    const valor = formatValor(campo.valores[0]?.valor, campo.tipoDato)
    const confirmaciones = campo.valores[0]?.confirmaciones

    const hayConfirmaciones = confirmaciones?.length > 0

    // Buscamos mi confirmacion (si existe)
    const yo = useSelector(state => state.user.uid)
    const miConfirmacionIndex = confirmaciones?.findIndex(confir => confir.user.id === yo)
    const miConfirmacion = miConfirmacionIndex && confirmaciones[miConfirmacionIndex]

    const confirmado = miConfirmacion ? miConfirmacion.confirmacion : false

    const [checked, setChecked] = useState(confirmado)

    const onCheckAction = (value) => {
        setChecked(value)
        dispatch(confirmar({ gambiteoId, campoId: campo.id, confirmacion: value }))
    }

    useEffect(() => {
        if (confirmado !== checked) {
            setChecked(confirmado)
        }
    }, [confirmado])

    return (
        <>
            <TouchableOpacity style={styles.item} disabled={(!hayConfirmaciones && !valorTruncado)} onPress={() => setIsCollapsed(prev => !prev)}>
                <View style={styles.cabecera}>
                    <Icon style={styles.icon} fill={theme['color-primary-500']} name="done-all-outline" />
                    <Text
                        style={styles.asunto}
                        status="primary"
                    >
                        {asunto}
                    </Text>
                    {
                        !editable &&
                        <Toggle
                            checked={checked}
                            onChange={onCheckAction}
                        />
                    }
                    <AccionesCampo onEdit={onEditPress} onDelete={onDeletePress} />
                    {
                        (hayConfirmaciones || valorTruncado) &&
                        <Icon style={styles.icon} fill={theme['color-primary-500']} name={isCollapsed ? 'chevron-down-outline' : 'chevron-up-outline'} />
                    }
                </View>
                <Animatable.View
                    duration={!isCollapsed ? 100 : 300}
                    easing={isCollapsed ? 'ease-in' : 'ease-out'}
                    animation={valorTruncado ? isCollapsed ? 'zoomIn' : 'zoomOutDown' : undefined}
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
                    animation={valorTruncado ? !isCollapsed ? 'zoomIn' : 'zoomOut' : undefined}
                    onAnimationEnd={() => {
                        if (isCollapsed) {
                            setShowSubheader(true)
                        }
                    }}
                >
                    <Text style={{ ...styles.valor, display: !valorTruncado ? 'none' : undefined }}>{valor}</Text>
                </Animatable.View>
                {
                    hayConfirmaciones &&
                    confirmaciones.map((confir, index) =>
                        <ConfirmacionItem
                            key={index}
                            nombre={confir.user.nombre}
                            username={confir.user.username}
                            img={confir.user.img}
                            valor={confir.confirmacion}
                        />
                    )
                }
            </Collapsible>
        </>
    )
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

export default Confirmacion;