import axios, { AxiosResponse } from 'axios';


export function Api(item: string): Promise<AxiosResponse<any, any>>{

    const options = {
        method: 'GET',
        url: 'https://pricer.p.rapidapi.com/str',
        params: { q: `${item}` },
        headers: {
            'X-RapidAPI-Key': '625991cf24msh24bb2daeff0312bp11bb56jsn0635b29f1ffd',
            'X-RapidAPI-Host': 'pricer.p.rapidapi.com'
        }
    };
    
    return axios.request(options)
}