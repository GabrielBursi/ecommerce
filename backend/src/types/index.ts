import { Locals } from "express";

export interface NewUser {
    uuid: string,
    name: string,
    email: string,
    password: string,
    confirmPassword: string,
    cpf: string
}

export interface IDepartment {
    name: string,
    img: string,
    to: string,
    uuid: string
}

export interface NewAddress {
    complement?: string;
    ref?: string;
    city?: string;
    state?: string;
    number: string;
    cep: string;
    identification: string;
    street: string;
    neighborhood: string;
    isSelected?: boolean;
}

export interface IEditAddress {
    complement?: string;
    ref?: string;
    number: string;
    identification: string;
}

export interface IProducts {
    uuid: string,
    name: string,
    description?: string,
    price: number | string,
    rating?: number,
    img: string,
    quant: number
}

export interface ProductsSchema extends IProducts {
    category: string
}

export interface IProductsAPI {
    price: {
        current_price: number
    }
    reviews: {
        rating: number
    }
    title: string,
    thumbnail: string,
}

export interface IParamProps {
    id?: string,
}
export interface MyResponse extends Locals {
    userId: string;
}

export interface IDelivery {
    name: string,
    rating: number,
    price: number,
    days: number,
    selected?: boolean,
}

export interface IFilterProducts {
    skip: number,
    exibir: number,
    price: {
        min: number,
        max: number
    }
}

export type Category = 'pc gamer' | 'monitor gamer' | 'cadeira gamer' | 'mouse e teclado' | 'celular' | 'vídeo games' | 'geek' | 'TV' | 'tablets' | 'hardware' | 'periféricos' | 'home' | 'áudio' | 'serviços digitais e softwares' | 'câmeras e drones' | 'casa inteligente' | 'espaço gamer'