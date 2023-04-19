import { Locals } from "express";

export interface NewUser {
    uuid: string,
    name: string,
    email: string,
    password: string,
    confirmPassword: string,
    cpf: string
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

export interface IProducts {
    uuid: string,
    name: string,
    description?: string,
    price: number | string,
    rating?: number,
    img: string,
    quant: number
}
export interface IParamProps {
    id?: string,
}
export interface MyResponse extends Locals {
    userId: string;
}
