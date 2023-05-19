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