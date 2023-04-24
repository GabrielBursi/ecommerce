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
    baseURL: "http://localhost:3001",
})

MyApi.interceptors.request.use(
    config => {
        const token = localStorage.getItem('accessToken')
        if(!token){
            throw new Error('Não foi encontrado token do localStorage - vindo da configuração da API')
        }
        config.headers['Authorization'] = `Bearer ${JSON.parse(token)}`;
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);