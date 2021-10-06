
import { useDispatch, useSelector } from 'react-redux';
import { toggleLoading } from '../store/slices/appSlice';

const useLoading = () => {
    const dispatch = useDispatch();

    const loading = useSelector(state => state.app.loading)
    const setLoading = (value) => dispatch(toggleLoading(value))

    return { loading, setLoading };
}

export default useLoading;