import axios from 'axios';
import { setToken } from '../store/slices/authSlice';
import { API_URL } from '@env';

const DEBUG = process.env.NODE_ENV === "development";

const AXIO_LOG = false;

const axiosSetup = (store) => {
    // URL base de la api
    axios.defaults.baseURL = API_URL

    // Headers generales
    axios.defaults.headers.common['crossDomain'] = true;
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    axios.defaults.headers.common['Access-Control-Allow-Methods'] = 'DELETE, POST, GET, OPTIONS';
    axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With';

    // Interceptor para añadir el token de autenticacion a cada llamada desde la store
    axios.interceptors.request.use(
        (config) => {
            const token = store.getState().auth.token
            if (token) {
                config.headers.common['Authorization'] = 'Bearer ' + token;
            }
            return config;
        },
        (error) => {
            console.error("✉️ ", error)
            return Promise.reject(error);
        }
    );

    // Interceptores para trazas de log en development
    if (DEBUG && AXIO_LOG) {
        axios.interceptors.request.use((config) => {
            if (DEBUG) { console.info("✉️ ", config); }
            return config;
        }, (error) => {
            if (DEBUG) { console.error("✉️ ", error.response.data.message); }
            return Promise.reject(error);
        });
        axios.interceptors.response.use((response) => {
            if (DEBUG) { console.info("📩 ", response); }
            return response;
        }, (error) => {
            if (DEBUG) {
                if (error.response.status === 401) {
                    console.info("📩 ", error.response.data.message);
                } else {
                    console.error("📩 ", error.response.data.message);
                }
            }
            return Promise.reject(error);
        });
    }

    // Interceptor para refrescar el token de autenticacion cuando caduque
    axios.interceptors.response.use(response => response,
        async error => {
            const originalRequest = error.config;
            if (error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;
                const refreshToken = store.getState().auth.refreshToken
                const { data: { token } } = await axios.post('/users/refresh', { refreshToken })
                store.dispatch(setToken(token))
                originalRequest.headers.Authorization = 'Bearer ' + token
                return axios(originalRequest);
            }
            return Promise.reject(error);
        }
    )
}

export default axiosSetup;