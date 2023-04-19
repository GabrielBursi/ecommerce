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