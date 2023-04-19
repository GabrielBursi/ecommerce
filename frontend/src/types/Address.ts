export type ICep = {
    name: string,
    rating: number,
    price: number,
    days: number,
    selected?: boolean,
}

export interface IAddress {
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

export interface IViaCep {
    logradouro: string,
    bairro: string,
    localidade: string,
    uf: string,
}