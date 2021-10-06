export const PRESET_CAMPO_DESCRIPCION = 1;
export const PRESET_CAMPO_ASISTENCIA = 2;
export const PRESET_CAMPO_FECHA = 3;
export const PRESET_CAMPO_HORA = 4;
export const PRESET_CAMPO_LUGAR = 5;

export const getPreset = (presetId) => {

    switch (presetId) {
        case PRESET_CAMPO_DESCRIPCION:
            return {
                asunto: 'Descripción',
                tipoCampo: 'info',
                tipoDato: 'texto',
                valores: [{ valor: '' }],
                presetId: presetId,
            }

        case PRESET_CAMPO_ASISTENCIA:
            return {
                asunto: 'Asistencia',
                tipoCampo: 'confirmacion',
                tipoDato: 'texto',
                valores: [{ valor: '¿Te apuntas?' }],
                presetId: presetId,
            }

        case PRESET_CAMPO_FECHA:
            return {
                asunto: 'Fecha',
                tipoCampo: 'info',
                tipoDato: 'fecha',
                valores: [{ valor: '' }],
                presetId: presetId,
            }

        case PRESET_CAMPO_HORA:
            return {
                asunto: 'Hora',
                tipoCampo: 'info',
                tipoDato: 'hora',
                valores: [{ valor: '' }],
                presetId: presetId,
            }

        case PRESET_CAMPO_LUGAR:
            return {
                asunto: 'Lugar',
                tipoCampo: 'info',
                tipoDato: 'texto',
                valores: [{ valor: '' }],
                presetId: presetId,
            }

        default:
            return null

    }
}

export const configuracionCreacionCampo = (presetID) => {

    switch (presetID) {
        case PRESET_CAMPO_DESCRIPCION:
        case PRESET_CAMPO_FECHA:
        case PRESET_CAMPO_HORA:
        case PRESET_CAMPO_LUGAR:
            return {
                disableAsunsto: true,
                disableTipoCampo: false,
                disableTipoDato: true,
            };

        case PRESET_CAMPO_ASISTENCIA:
            return {
                disableAsunsto: true,
                disableTipoCampo: true,
                disableTipoDato: true,
            };

        default:
            return {
                disableAsunsto: false,
                disableTipoCampo: false,
                disableTipoDato: false,
            };
    }
}