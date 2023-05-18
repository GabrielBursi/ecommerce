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

export type LimitProductsPerPage = 20 | 40 | 60 | 80 | 100
export type LimitProductsPerPageString = '20 por página' | '40 por página' | '60 por página' | '80 por página' | '100 por página'
export type Category = 'pc gamer' | 'monitor gamer' | 'cadeira gamer' | 'mouse e teclado' | 'celular' | 'vídeo games' | 'geek' | 'TV' | 'tablets' | 'hardware' | 'periféricos' | 'home' | 'áudio' | 'serviços digitais e softwares' | 'câmeras e drones' | 'casa inteligente' | 'espaço gamer'