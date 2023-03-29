import axios from 'axios';
import { DataApiTeste, IProducts, YupSchemaLogin } from '../../types';
import { convertCurrency } from '../ApiExchangeRate';
import { arrayTESTE, formaProductPrice } from '../utils';

type lenght = 20 | 40 | 60 | 80 | 100

export const ApiTest = axios.create({
    baseURL: 'http://localhost:3333/'
})

export async function getAllProducts(convert = false, urlRelativa = false ,lenght: lenght = 20, page = '1'){
    try {

        if(urlRelativa && !convert){ 
            const newUrl = `/products100?_page=${page}&_limit=${lenght}`
            const { data, headers } = await ApiTest(newUrl)

            const dataWithProductPriceNumber = formaProductPrice(data as IProducts[])

            return {
                data: dataWithProductPriceNumber,
                totalCount: Number(headers['x-total-count'])
            }
        }

        if (urlRelativa && convert) {
            const newUrl = `/products100?_page=${page}&_limit=${lenght}`
            const { data, headers } = await ApiTest(newUrl)

            const dataWithProductPriceNumber = formaProductPrice(data as IProducts[])
            const dataPriceConverted = await convertCurrency(dataWithProductPriceNumber)

            return {
                data: dataPriceConverted,
                totalCount: Number(headers['x-total-count'])
            }
        }

        const res = await ApiTest(`/products${lenght}`)

        if(convert && !urlRelativa){
            const productsWithPriceConverted = await convertCurrency(res.data)
            return productsWithPriceConverted
        }

        return res.data as IProducts[]

    } catch (error) {
        alert(error + ' API FAKE NÃO ESTA NO AR, COMANDO PARA API FAKE: npm run server - USANDO ARRAY DE TESTE COM 10 PRODUTOS');
        const arrayTesteSemNumero = formaProductPrice(arrayTESTE)

        if(convert){
            const productsWithPriceConverted = await convertCurrency(arrayTesteSemNumero)
            return productsWithPriceConverted
        }

        return arrayTesteSemNumero
    }
}

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