import axios from 'axios';
import { DataApiTeste, YupSchemaLogin } from '../types';

export const ApiTest = axios.create({
    baseURL: 'http://localhost:3333/'
})

export async function getAllUser(){
    const { data } = await ApiTest('/login')
    return data as DataApiTeste[];
}

export async function getUserById(id: number) {
    const { data } = await ApiTest(`/login/${id}`)
    return data as DataApiTeste;
}

export async function createUser(user: YupSchemaLogin): Promise<DataApiTeste>{
    const { data } = await ApiTest.post('/login', user)
    return data as DataApiTeste;
}

export async function login(user: Pick<YupSchemaLogin, 'email' | 'password'>){
    const users = await getAllUser();
    const login = users.find(userCreated => userCreated.email === user.email)

    return login ?? 'Esse usuario nao existe.'
}

export async function userIsLogged(){
    const dataUser = localStorage.getItem('idUserLogged')

    if(!dataUser){
        return false
    }

    const id = Number(dataUser)
    const user = await getUserById(id)
    return user
}