import { Divider, Input, List, useTheme } from '@ui-kitten/components';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, Keyboard, StyleSheet } from 'react-native';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import TipoInfoSelector from '../components/creacionGambiteo/creacionCampos/TipoInfoSelector';
import ScreenLayout from '../components/layout/ScreenLayout';
import ListFooter from '../components/ListFooter';
import TopNavigationSimpleForm from '../components/navigation/TopNavigationSimpleForm';
import { configuracionCreacionCampo } from '../util/camposGambiteoUtil';
import getIdentificador from '../util/getIdentificador';
import TipoCampoInput from './../components/creacionGambiteo/creacionCampos/TipoCampoInput';
import TipoDatoSelector from './../components/creacionGambiteo/creacionCampos/TipoDatoSelector';
import useGambiteoCreator from './../hooks/useGambiteoCreator';

const CrearCampoGambiteoScreen = ({ navigation, route }) => {
    const theme = useTheme()

    const lastInputRef = useRef()

    const { nuevoGambiteo: { campos }, actualizarGambiteo } = useGambiteoCreator();

    // Estados con los atributos del campo
    const [asunto, setAsunto] = useState()
    const [tipoCampo, setTipoCampo] = useState()
    const [tipoDato, setTipoDato] = useState()
    const [valores, setValores] = useState([])

    const [presetId, setPresetId] = useState()

    const edit = route?.params?.edit;
    useEffect(() => {
        if (!!edit) {
            setAsunto(edit.asunto)
            setTipoCampo(edit.tipoCampo)
            setTipoDato(edit.tipoDato)
            setValores(edit.valores)
            setPresetId(edit.presetId)
        }
    }, [edit])

    const preset = route?.params?.preset;
    useEffect(() => {
        if (!!preset) {
            setAsunto(preset.asunto)
            setTipoCampo(preset.tipoCampo)
            setTipoDato(preset.tipoDato)
            setValores(preset.valores)
            setPresetId(preset.presetId)
        }
    }, [preset])

    useEffect(() => {
        navigation.removeListener('beforeRemove')
        navigation.addListener('beforeRemove', (e) => {
            Keyboard.dismiss();

            let asuntoModificado
            let tipoCampoModificado
            let tipoDatoModificado
            let valoresModificados
            if (preset) {
                asuntoModificado = preset.asunto !== asunto
                tipoCampoModificado = preset.tipoCampo !== tipoCampo
                tipoDatoModificado = preset.tipoDato !== tipoDato
                valoresModificados = preset.valores.length !== valores.length // TODO Muy cutre, solo mira si añades o quitas
            } else if (edit) {
                asuntoModificado = edit.asunto !== asunto
                tipoCampoModificado = edit.tipoCampo !== tipoCampo
                tipoDatoModificado = edit.tipoDato !== tipoDato
                valoresModificados = edit.valores.length !== valores.length // TODO Muy cutre, solo mira si añades o quitas
            } else {
                asuntoModificado = !!asunto
                tipoCampoModificado = !!tipoCampo
                tipoDatoModificado = !!tipoDato
                valoresModificados = !!valores[0]
            }

            if (!asuntoModificado && !tipoCampoModificado && !tipoDatoModificado && !valoresModificados) {
                // Si no hay cambios dejamos retroceder
                return;
            }

            e.preventDefault();

            Alert.alert(
                'Descartar cambios?',
                'Tienes cambios sin guardar. Estás seguro que quieres salir sin guardar?',
                [
                    { text: "Cancelar", style: 'cancel', onPress: () => { } },
                    {
                        text: 'OK',
                        style: 'destructive',
                        onPress: () => navigation.dispatch(e.data.action),
                    },
                ]
            );

            return () => {
                navigation.removeListener('beforeRemove')
            }
        })

        return () => {
            navigation.removeListener('beforeRemove')
        }
    }, [asunto, tipoCampo, tipoDato, valores, preset, edit])

    // Handlers para contrar las selecciones de tipo
    const handleTipoCampoChange = (value) => {
        if (value !== tipoCampo) {
            setValores([])
            setTipoCampo(value)
        }
    }
    const handleTipoDatoChange = (value) => {
        if (value !== tipoDato) {
            setValores([])
            setTipoDato(value)
        }
    }
    const confirm = (handler) => {
        if (valoresRellenados.length > 0) {
            Alert.alert(
                "Aviso",
                "Se descartarán los datos que hayas cubierto",
                [
                    {
                        text: "Cancel",
                        onPress: () => { },
                        style: "cancel"
                    },
                    { text: "OK", onPress: handler }
                ],
                { cancelable: false }
            );
        } else {
            handler()
        }
    }

    const agregarValorVacio = () => {
        const emptyValor = {
            key: uuidv4(),
            valor: '',
            votos: []
        }
        setValores(prev => [...prev, emptyValor])
    }

    const modificarValor = (key, valor) => {
        const lastValor = valores[valores.length - 1]
        if (tipoCampo === 'opcion' && lastValor.key === key && valor) {
            agregarValorVacio()
        }
        setValores(prev => prev.map(val => {
            if (val.key === key) {
                return {
                    ...val,
                    valor: valor
                }
            }
            return val;
        }))
    }

    const borrarValor = (key) => {
        setValores(prev => prev.filter(val => val.key !== key))
    }

    const focusLastItem = () => {
        if (lastInputRef.current && tipoCampo === 'opcion') {
            lastInputRef.current.focus()
        }
    }

    useEffect(() => {
        if (tipoCampo && tipoDato && valores.length === 0) {
            agregarValorVacio()
        }
    }, [tipoCampo, tipoDato])

    const submit = () => {
        navigation.removeListener('beforeRemove')
        Keyboard.dismiss();

        const campo = {
            asunto: asunto,
            tipoCampo: tipoCampo,
            tipoDato: tipoDato,
            valores: valores.filter(val => !!val.valor),
            presetId: presetId
        }
        if (!edit) {
            campo.key = uuidv4()
            const camposActualizados = [...campos]

            if (!preset) {
                camposActualizados.push(campo)
            } else {
                const presetId = preset.presetId;
                campo.presetId = presetId;
                let index = 0
                for (let c of camposActualizados) {
                    if (!c.presetId || c.presetId > presetId) {
                        break
                    }
                    index++
                }
                if (index === -1) {
                    camposActualizados.push(campo)
                } else {
                    camposActualizados.splice(index, 0, campo)
                }
            }

            actualizarGambiteo('campos', camposActualizados)
        } else {
            actualizarGambiteo('campos', campos.map(c => {
                if (getIdentificador(c) === getIdentificador(edit)) {
                    return campo
                }
                return c;
            }))
        }

        navigation.navigate('New')
    }

    const valoresRellenados = valores.filter(val => !!val.valor);

    const { disableAsunsto, disableTipoCampo, disableTipoDato } = configuracionCreacionCampo(presetId)

    const valido = !!asunto && !!tipoCampo && !!tipoDato && valoresRellenados.length > 0;

    const listHeader = (
        <>
            {/* ASUNTO */}
            <Input
                style={styles.input}
                disabled={disableAsunsto}
                label="Asunto"
                value={asunto}
                onChangeText={setAsunto}
            />

            {/* SELECTOR TIPO CAMPO */}
            <TipoInfoSelector
                style={styles.input}
                disabled={disableTipoCampo}
                value={tipoCampo}
                onValueChange={(value) => confirm(() => handleTipoCampoChange(value))}
            />

            {/* SELECTOR TIPO DATO */}
            <TipoDatoSelector
                style={styles.input}
                disabled={disableTipoDato}
                value={tipoDato}
                onValueChange={(value) => confirm(() => handleTipoDatoChange(value))}
            />

            {
                tipoCampo === 'opcion' && <Divider />
            }

        </>
    )

    return (
        <ScreenLayout >

            <TopNavigationSimpleForm navigation={navigation} onSave={submit} disabled={!valido} />

            <List
                style={{ paddingHorizontal: 15, }}
                removeClippedSubviews={false}
                keyboardShouldPersistTaps={'handled'}
                ListHeaderComponent={listHeader}
                data={valores}
                renderItem={({ item, index }) => (
                    <TipoCampoInput
                        ref={lastInputRef}
                        style={styles.input}
                        tipoCampo={tipoCampo}
                        tipoDato={tipoDato}
                        index={index}
                        onSubmit={focusLastItem}
                        onRemove={index < valores.length - 1 && (() => borrarValor(item.key))}
                        value={item.valor}
                        onValueChange={(value) => modificarValor(item.key, value)}
                    />
                )}
                ItemSeparatorComponent={Divider}
                ListFooterComponent={ListFooter}
            />
        </ScreenLayout>
    );
}

const styles = StyleSheet.create({
    input: {
        marginVertical: 10,
    },
})

export default CrearCampoGambiteoScreen;