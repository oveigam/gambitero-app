import { Icon, IndexPath, Select, SelectItem } from '@ui-kitten/components';
import React from 'react';

const captions = [
    'Permite introducir texto plato',
    'Permite indtroducir una fecha',
    'Permite indtroducir una hora',
]

const values = ['texto', 'fecha', 'hora']

const titles = ['Texto', 'Fecha', 'Hora']

const TipoDatoSelector = ({ style, value, onValueChange, disabled }) => {

    const index = values.indexOf(value)
    const selectedIndex = new IndexPath(index)

    const titulo = titles[index] ? titles[index] : 'Selecciona el tipo de dato'

    return (
        <Select
            style={style}
            label="Dato"
            caption={captions[index]}
            disabled={disabled}
            value={titulo}
            selectedIndex={selectedIndex}
            onSelect={(indexPath) => onValueChange(values[indexPath.row])}
        >
            <SelectItem
                title="Texto"
                accessoryLeft={(props) => <Icon {...props} name="text-outline" />}
            />

            <SelectItem
                title="Fecha"
                accessoryLeft={(props) => <Icon {...props} name="calendar-outline" />}
            />

            <SelectItem
                title="Hora"
                accessoryLeft={(props) => <Icon {...props} name="clock-outline" />}
            />
        </Select>
    );
}

export default TipoDatoSelector;