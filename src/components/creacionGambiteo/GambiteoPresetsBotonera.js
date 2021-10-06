import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Icon, Text } from '@ui-kitten/components';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { PRESET_CAMPO_ASISTENCIA, PRESET_CAMPO_DESCRIPCION, PRESET_CAMPO_FECHA, PRESET_CAMPO_HORA, PRESET_CAMPO_LUGAR } from '../../util/camposGambiteoUtil';
import AddCampoPresetButton from './AddCampoPresetButton';

const GambiteoPresetsBotonera = ({ onCreatePreset, disabledPresets, onCustomPresset }) => {
    return (
        <>
            <Text style={styles.label} category="label" appearance="hint" >Agregar información:</Text>
            <View style={styles.botoneraPresets}>
                <AddCampoPresetButton
                    style={styles.presetButton}
                    icon={(props) => <Icon {...props} name="file-text-outline" />}
                    label="Desc."
                    onPress={() => onCreatePreset(PRESET_CAMPO_DESCRIPCION)}
                    disabled={disabledPresets.includes(1)}
                />
                <AddCampoPresetButton
                    style={styles.presetButton}
                    icon={(props) => <Icon {...props} name="person-done-outline" />}
                    label="Asis."
                    onPress={() => onCreatePreset(PRESET_CAMPO_ASISTENCIA)}
                    disabled={disabledPresets.includes(2)}
                />
                <AddCampoPresetButton
                    style={styles.presetButton}
                    icon={(props) => <Icon {...props} name="calendar-outline" />}
                    label="Fecha"
                    onPress={() => onCreatePreset(PRESET_CAMPO_FECHA)}
                    disabled={disabledPresets.includes(3)}
                />
                <AddCampoPresetButton
                    style={styles.presetButton}
                    icon={(props) => <Icon {...props} name="clock-outline" />}
                    label="Hora"
                    onPress={() => onCreatePreset(PRESET_CAMPO_HORA)}
                    disabled={disabledPresets.includes(4)}
                />
                <AddCampoPresetButton
                    style={styles.presetButton}
                    icon={({ style }) => <MaterialCommunityIcons name="map-marker-outline" size={style.width} color={style.tintColor} />}
                    label="Lugar"
                    onPress={() => onCreatePreset(PRESET_CAMPO_LUGAR)}
                    disabled={disabledPresets.includes(5)}
                />
                <AddCampoPresetButton
                    style={styles.presetButton}
                    icon={(props) => <Icon {...props} name="edit-2-outline" />}
                    label="Personaliz."
                    onPress={() => onCustomPresset()}
                />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    label: {
        marginHorizontal: 15,
        marginTop: 10
    },
    botoneraPresets: {
        margin: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    presetButton: {
        margin: 3
    },
})

export default GambiteoPresetsBotonera;