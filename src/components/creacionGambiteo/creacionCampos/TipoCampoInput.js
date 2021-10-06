import { Button, Icon, Input } from '@ui-kitten/components';
import React, { forwardRef } from 'react';
import { View } from 'react-native';
import DateTimeInput from './tipoDatoInputs/DateTimeInput';

const TipoCampoInput = (props, ref) => {
    const { tipoDato, value, onValueChange, style, tipoCampo, focusLastItem, onRemove, onSubmit, index } = props

    let label = ''
    if (tipoCampo === 'opcion') {
        label = 'Opción ' + (index + 1)
    } else {
        switch (tipoDato) {
            case 'fecha':
                label = 'Fecha'
                break
            case 'hora':
                label = 'Hora'
                break
            default:
                label = 'Descripción'
                break
        }
    }


    switch (tipoDato) {
        case 'texto':
            return (
                <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                    <Input
                        ref={ref}
                        style={{ flex: 1, ...style }}
                        label={label}
                        onSubmitEditing={focusLastItem}
                        value={value}
                        onChangeText={onValueChange}
                        onSubmitEditing={onSubmit}
                    />
                    {
                        onRemove &&
                        <Button
                            style={{ height: '53%', marginBottom: 8, marginHorizontal: 1 }}
                            status="primary"
                            appearance="ghost"
                            accessoryLeft={(props) => <Icon {...props} name="trash-2-outline" />}
                            onPress={onRemove}
                        />
                    }
                </View>
            )

        case 'fecha':
        case 'hora':
            return (
                <DateTimeInput
                    ref={ref}
                    style={style}
                    label={label}
                    mode={tipoDato === 'fecha' ? 'date' : 'time'}
                    value={value}
                    onValueChage={onValueChange}
                    onRemove={onRemove}
                />
            )

        default:
            return null
    }
}

export default forwardRef(TipoCampoInput);