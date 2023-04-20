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
        config.headers['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`;
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);