import { IAddress } from "./Address"
import { ICartAPI, IMyOrders, IProducts } from "./Api"

export interface IUser {
    uuid: string,
    name: string,
    email: string,
    password: string,
    confirmPassword: string,
    cpf: string
}

export interface DataApiTeste extends IUser {
    id: number
}

export interface IUserShopData {
    address: IAddress[],
    favorites: IProducts[],
    cart: ICartAPI,
    myOrders: IMyOrders[]
}

export interface IUserDataAPI {
    accessToken: string,
    user: IUser & IUserShopData
}