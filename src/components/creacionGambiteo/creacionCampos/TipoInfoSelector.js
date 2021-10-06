import { Icon, IndexPath, Select, SelectItem } from '@ui-kitten/components';
import React from 'react';

const captions = [
    'Muestra información a los participantes',
    'Permite que cada participante elija entre varias opciones',
    'Pide a los participantes que confirmen si o no'
]

const values = ['info', 'opcion', 'confirmacion']

const titles =  ['Info', 'Votación', 'Confirmación']

const TipoInfoSelector = ({ style, value, onValueChange, disabled }) => {

    const index = values.indexOf(value)
    const selectedIndex = new IndexPath(index)

    const titulo = titles[index] ? titles[index] : 'Selecciona un tipo'

    return (
        <Select
            style={style}
            label="Tipo"
            caption={captions[index]}
            disabled={disabled}
            value={titulo}
            selectedIndex={selectedIndex}
            onSelect={(indexPath) => onValueChange(values[indexPath.row])}
        >
            <SelectItem
                title="Info"
                accessoryLeft={(props) => <Icon {...props} name="info-outline" />}
            />

            <SelectItem
                title="Votación"
                accessoryLeft={(props) => <Icon {...props} name="checkmark-circle-outline" />}
            />

            <SelectItem
                title="Confirmación"
                accessoryLeft={(props) => <Icon {...props} name="done-all-outline" />}
            />
        </Select>
    );
}

export default TipoInfoSelector;