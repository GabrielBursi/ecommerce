import axios from "axios";
import { IProductsAPI } from "../../../types";

export interface Data {
    data: {
        result: IProductsAPI[]
    }
}

export async function Api(item: string, page: number = 1): Promise<IProductsAPI[] | Error>{

    const options = {
        method: 'GET',
        url: process.env.RAPID_API_URL,
        params: {
            query: item,
            page: page,
            country: 'BR'
        },
        headers: {
            'X-RapidAPI-Key': process.env.RAPID_API_KEY, 
            'X-RapidAPI-Host': process.env.RAPID_API_HOST 
        }
    };

    try {
        const res = await axios(options)
        
        const { data } = res as Data
        const { result } = data

        return result
    } catch (error) {
        return new Error('Erro' + error)
    }

}   
