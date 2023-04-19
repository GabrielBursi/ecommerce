import { IAddress } from "./Address"

export interface IProducts {
    uuid: string, 
    name: string,
    description?: string,
    price: number | string,
    rating?: number,
    img: string,
    quant?: number
}

export interface IMyOrders {
    number: string,
    status: boolean,
    date: string,
    payment: string,
    products: IProducts[],
    address: IAddress | undefined
}

export interface TabBarProducts {
    name: string,
    to: string
}

export interface DepartmentCardProps {
    name: string,
    src: string,
    to: string
}

export interface IErrorAPI {
    data: {
        error: {
            default: string;
        }
    }
}