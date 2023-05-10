import axios, { AxiosResponse } from 'axios';

const env = process.env.NODE_ENV === 'production'

export function Api(item: string): Promise<AxiosResponse<any, any>>{

    const options = {
        method: 'GET',
        url: process.env.API_URL,
        params: {query: item, country: 'BR'},
        headers: {
            'X-RapidAPI-Key': process.env.API_KEY,
            'X-RapidAPI-Host': process.env.API_HOST
        }
    };
    
    return axios.request(options)
}   

export const MyApi = axios.create({
    baseURL: env ? process.env.REACT_APP_BACKEND_URL : process.env.REACT_APP_BACKEND_LOCAL,
})

const nonAuthRoutes = process.env.REACT_APP_NON_AUTH_ROUTES

MyApi.interceptors.request.use(
    config => {
        const token = localStorage.getItem('accessToken')
        const currentRoute = config.url?.split('?')[0]; 

        if (nonAuthRoutes?.split(',')?.includes(currentRoute!)) {
            return config; 
        }

        if(!token){
            return Promise.reject('erro no interceptor - token não encontrado');
        }
        config.headers['Authorization'] = `Bearer ${JSON.parse(token)}`;
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);