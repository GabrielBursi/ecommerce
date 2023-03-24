import axios from 'axios';
import { DataApiTeste, YupSchemaLogin } from '../types';

export const ApiTest = axios.create({
    baseURL: 'http://localhost:3333/'
})

export async function getAllUser(){
    try {
        const { data } = await ApiTest('/login')
        return data as DataApiTeste[];
    }catch (error){
        return new Error('API FAKE DESLIGADA: ' + error)
    }
}

export async function getUserById(id: number) {
    try {
        const { data } = await ApiTest(`/login/${id}`)
        return data as DataApiTeste;
    }catch (error){
        return new Error('API FAKE DESLIGADA: ' + error)
    }
}

export async function createUser(user: YupSchemaLogin){
    try {
        const { data } = await ApiTest.post('/login', user)
        return data as DataApiTeste;
    }catch(error){
        return new Error('API FAKE DESLIGADA: ' + error)
    }
}

export async function login(user: Pick<YupSchemaLogin, 'email' | 'password'>){
    
    const users = await getAllUser();

    if(users instanceof Error){
        return users
    }
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