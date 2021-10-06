import { Button, Icon, MenuItem, OverflowMenu } from '@ui-kitten/components';
import React, { useState } from 'react';

const AccionesCampo = ({ onEdit, onDelete }) => {

    const [isOpen, setIsOpen] = useState(false)

    if (!onEdit && !onDelete) {
        return null
    }

    return (
        <OverflowMenu
            visible={isOpen}
            onBackdropPress={() => setIsOpen(false)}
            anchor={() => (
                <Button
                    appearance="ghost"
                    accessoryLeft={(props) => <Icon {...props} name="more-horizontal-outline" />}
                    onPress={() => setIsOpen(true)}
                />
            )}
        >
            {
                !!onEdit &&
                <MenuItem
                    title="Editar"
                    accessoryLeft={(props) => <Icon {...props} name='edit-outline' />}
                    onPress={() => {
                        setIsOpen(false)
                        onEdit()
                    }}
                />
            }
            {
                !!onDelete &&
                <MenuItem
                    title="Borrar"
                    accessoryLeft={(props) => <Icon {...props} name='trash-2-outline' />}
                    onPress={() => {
                        setIsOpen(false)
                        onDelete()
                    }}
                />
            }
        </OverflowMenu>
    );
}

export default AccionesCampo;