import axios, { AxiosResponse } from 'axios';


export function Api(item: string): Promise<AxiosResponse<any, any>>{

    const options = {
        method: 'GET',
        url: 'https://real-time-amazon-data.p.rapidapi.com/search',
        params: {query: item, country: 'BR', category_id: 'aps', page: '1'},
        headers: {
            'X-RapidAPI-Key': '625991cf24msh24bb2daeff0312bp11bb56jsn0635b29f1ffd',
            'X-RapidAPI-Host': 'real-time-amazon-data.p.rapidapi.com'
        }
    };
    
    return axios.request(options)
}