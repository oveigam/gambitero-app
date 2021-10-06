
import { useSelector, useDispatch } from 'react-redux';
import { limpiarCreacionGambiteo, updateCreacionGambiteo } from '../store/slices/gambiteoSlice';

const useGambiteoCreator = () => {
    const dispatch = useDispatch();

    const id = useSelector(state => state.gambiteo.nuevoGambiteo.id)
    const titulo = useSelector(state => state.gambiteo.nuevoGambiteo.titulo)
    const img = useSelector(state => state.gambiteo.nuevoGambiteo.img)
    const participantes = useSelector(state => state.gambiteo.nuevoGambiteo.participantes)
    const campos = useSelector(state => state.gambiteo.nuevoGambiteo.campos)

    const modificado = useSelector(state => state.gambiteo.nuevoGambiteoModificado)

    const nuevoGambiteo = {
        modificado: modificado,
        id: id,
        titulo: titulo ? titulo : '',
        img: img,
        participantes: participantes ? participantes : [],
        campos: campos ? campos : [],
    }

    const actualizarGambiteo = (field, value) => dispatch(updateCreacionGambiteo({ field, value }))
    const limpiarGambiteo = () => dispatch(limpiarCreacionGambiteo())

    return { nuevoGambiteo, actualizarGambiteo, limpiarGambiteo }
}

export default useGambiteoCreator;