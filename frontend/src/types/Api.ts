import { IAddress } from "./Address"

export interface IProducts {
    uuid: string, 
    name: string,
    description?: string,
    price: number | string,
    rating?: number,
    img: string,
    quant?: number,
}

export interface IProductsCategory {
    products: IProducts[],
    totalCount: number
}

export interface ICartAPI {
    total: number,
    products: IProducts[]
}

export interface IMyOrders {
    address: IAddress | undefined,
    info: {
        number: string,
        status: boolean,
        date: string,
        payment: string,
    },
    products: ICartAPI
}

export interface TabBarProducts {
    name: string,
    to: string
}

export interface IDepartment {
    name: string,
    img: string,
    to: string,
    uuid: string
}

export interface IErrorAPI {
    response: {
        data: {
            errors: {
                    default: string;
                
            }
        }
        }
    }