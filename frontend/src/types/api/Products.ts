import { AddressFormData } from "../cep"

export interface IProducts {
    id: id, //! a api tem uma propriedade asin que é única e string
    name: string,
    description?: string,
    price:number | string,
    rating?:number,
    img: string,
    quant?: number
}

export type id = number | string

export interface TabBarProducts {
    name:string,
    to: string
}

export interface DepartmentCardProps {
    name: string,
    src: string,
    to: string
}

export interface MyRequestsData {
    number: string,
    status: boolean,
    date: string,
    payment: string,
    products: IProducts[],
    address: AddressFormData | undefined
}