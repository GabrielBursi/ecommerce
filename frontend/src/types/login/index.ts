export interface YupSchemaLogin {
    name: string,
    email: string,
    password: string,
    confirmPassword: string,
    cpf:string
}
export interface DataApiTeste extends YupSchemaLogin{
    id: number
}