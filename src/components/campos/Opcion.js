import { Button, Icon, Radio, Text, useTheme } from '@ui-kitten/components';
import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Collapsible from 'react-native-collapsible';
import { useDispatch, useSelector } from 'react-redux';
import { votar } from '../../store/slices/gambiteoSlice';
import formatValor from '../../util/formatValor';
import AccionesCampo from './AccionesCampo';
import VotosModal from './VotosModal';

const Opcion = (props) => {
    const theme = useTheme()
    const dispatch = useDispatch()

    const [isCollapsed, setIsCollapsed] = useState(true)
    const [votosModal, setVotosModal] = useState()

    const { gambiteoId, campo, onEditPress, onDeletePress } = props

    const editable = !!onEditPress || !!onDeletePress

    const asunto = campo.asunto
    const opciones = campo.valores || []

    const yo = useSelector(state => state.user.uid)
    const miVotoIndex = opciones.findIndex(opc => !!opc.votos.find(v => v.id === yo))

    const [selectedIndex, setSelectedIndex] = useState(miVotoIndex)

    const onSelection = (index) => {
        setSelectedIndex(index)
        const selectedOption = opciones[index]
        dispatch(votar({ gambiteoId, campoId: campo.id, opcionId: selectedOption.id }))
    }

    useEffect(() => {
        if (miVotoIndex !== selectedIndex) {
            setSelectedIndex(miVotoIndex)
        }
    }, [miVotoIndex])

    return (
        <>
            <TouchableOpacity style={styles.item} onPress={() => setIsCollapsed(prev => !prev)}>
                <View style={styles.cabecera}>
                    <Icon style={styles.icon} fill={theme['color-primary-500']} name="checkmark-circle-outline" />
                    <Text style={styles.asunto} status="primary" >{asunto}</Text>
                    <AccionesCampo onEdit={onEditPress} onDelete={onDeletePress} />
                    <Icon style={styles.icon} fill={theme['color-primary-500']} name={isCollapsed ? 'chevron-down-outline' : 'chevron-up-outline'} />
                </View>
            </TouchableOpacity>
            <Collapsible collapsed={isCollapsed}>
                {
                    opciones.map((op, index) =>
                        <View key={index} style={styles.radio} >
                            <Button
                                style={styles.votesCountButton}
                                status={op.votos.length < 1 ? 'basic' : 'primary'}
                                appearance="ghost"
                                size="small"
                                accessoryLeft={({ style }) => <Icon style={{ ...style, marginHorizontal: 0 }} name="checkmark-circle-outline" />}
                                onPress={() => {
                                    if (op.votos.length > 0) {
                                        setVotosModal(op.votos)
                                    }
                                }}
                            >
                                {({ style }) => <Text style={{ ...style, marginHorizontal: 3 }}>{op.votos.length || '0'}</Text>}
                            </Button>
                            <Radio disabled={editable} checked={index === selectedIndex} onChange={() => onSelection(index)} >{formatValor(op.valor, campo.tipoDato)}</Radio>
                        </View>
                    )
                }
            </Collapsible>
            <VotosModal
                votos={votosModal}
                visible={!!votosModal}
                onDismiss={() => setVotosModal(null)}
            />
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
        flexDirection: 'row',
        alignItems: 'center'
    },
    asunto: {
        fontWeight: 'bold',
        flex: 1
    },
    radio: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 13,
        paddingVertical: 3,
    },
    votesCountButton: {
        marginRight: 4,
    }
})

export default Opcion;