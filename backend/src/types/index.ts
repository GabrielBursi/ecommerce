export interface NewUser {
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
    _id: id,
    name: string,
    description?: string,
    price: number | string,
    rating?: number,
    img: string,
    quant?: number
}

type id = number | string

export interface AddressFormData {
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