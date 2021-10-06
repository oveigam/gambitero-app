import axios from 'axios';
import { setError } from '../slices/appSlice';

const apc = (path, method, completePathWithPayloadProp) => {
    return async (payload, { dispatch, rejectWithValue }) => {
        try {
            const completePath = completePathWithPayloadProp ? (path + '/' + payload[completePathWithPayloadProp]) : path
            switch (method) {
                case 'POST':
                    const { data: postResponseData } = await axios.post(completePath, payload)
                    return postResponseData

                case 'PUT':
                    const { data: putResponseData } = await axios.put(completePath, payload)
                    return putResponseData

                case 'DELETE':
                    const { data: deleteResponseData } = await axios.delete(completePath, payload)
                    return deleteResponseData

                case 'PATCH':
                    const { data: patchResponseData } = await axios.patch(completePath, payload)
                    return patchResponseData

                case 'GET':
                default:
                    const { data: getResponseData } = await axios.get(completePath, payload)
                    return getResponseData
            }
        } catch (error) {
            console.error('[REDUX API CALL ERROR]', error.response.data)
            dispatch(setError(error.response?.data))
            return rejectWithValue(error.response?.data)
        }
    }
}

export const apcGet = (path, completePathWithPayloadProp) => apc(path, 'GET', completePathWithPayloadProp)
export const apcPost = (path, completePathWithPayloadProp) => apc(path, 'POST', completePathWithPayloadProp)
export const apcPut = (path, completePathWithPayloadProp) => apc(path, 'PUT', completePathWithPayloadProp)
export const apcDelete = (path, completePathWithPayloadProp) => apc(path, 'DELETE', completePathWithPayloadProp)
export const apcPath = (path, completePathWithPayloadProp) => apc(path, 'PATCH', completePathWithPayloadProp)