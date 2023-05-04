import axios, { AxiosResponse } from 'axios';


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
    baseURL: process.env.REACT_APP_BACKEND_URL,
})

MyApi.interceptors.request.use(
    config => {
        const token = localStorage.getItem('accessToken')
        if(!token){
            return config
        }
        config.headers['Authorization'] = `Bearer ${JSON.parse(token)}`;
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);