import React from 'react';
import Confirmacion from './Confirmacion';
import Info from './Info';
import Opcion from './Opcion';

const Campo = (props) => {

    switch (props.campo.tipoCampo) {

        case 'opcion':
            return <Opcion {...props} />

        case 'confirmacion':
            return <Confirmacion {...props} />

        case 'info':
        default:
            return <Info {...props} />

    }
}

export default Campo;