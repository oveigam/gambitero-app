import DateTimePicker from '@react-native-community/datetimepicker'
import { Button, Icon, Text } from '@ui-kitten/components'
import moment from 'moment'
import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { StyleSheet, View } from 'react-native'

const DateTimeInput = (props, ref) => {
    const { value, onValueChage, mode, onRemove, label } = props;
    const [show, setShow] = useState();

    const tipo = mode === 'date' ? 'Fecha' : 'Hora'

    let text = 'Seleccionar ' + tipo;
    if (value) {
        text = moment(value).format(mode === 'date' ? 'DD/MM/yyyy' : 'HH:mm')
    }

    useImperativeHandle(ref, () => ({
        focus: () => {
            setShow(true)
        }
    }))

    return (
        <>
            <View style={{ ...styles.container, ...props.style }}>
                <View style={{flex: 1}}>
                    <Text style={{marginBottom: 3}} appearance="hint" category="label" >{label}</Text>
                    <Button
                        style={{ flex: 1, justifyContent: 'flex-start' }}
                        status="basic"
                        appearance="ghost"
                        onPress={() => setShow(true)}
                    >
                        {text}
                    </Button>
                </View>
                {
                    onRemove &&
                    <Button
                        status="primary"
                        appearance="ghost"
                        accessoryLeft={(props) => <Icon {...props} name="trash-2-outline" />}
                        onPress={onRemove}
                    />
                }
            </View>
            {
                show &&
                <DateTimePicker
                    testID="dateTimePicker"
                    value={new Date()}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={(event, selectedDate) => {
                        setShow(Platform.OS === 'ios');
                        if (selectedDate) {
                            onValueChage(moment(selectedDate).toISOString())
                        }
                    }}
                />
            }
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    },
    input: {
        flex: 1
    }
})

export default forwardRef(DateTimeInput);