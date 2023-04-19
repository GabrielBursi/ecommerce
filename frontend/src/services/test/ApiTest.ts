import axios from 'axios';
import { DataApiTeste, IProducts, IUser } from '../../types';
import { convertCurrency } from '../config/ApiExchangeRate';
import { arrayTESTE, formaProductPrice } from '../utils';

type lenght = 20 | 40 | 60 | 80 | 100

export const ApiTest = axios.create({
    baseURL: 'http://localhost:3333/'
})

export async function getAllProducts(
        convert = false, 
        urlRelativa = false , 
        category: string = '100', 
        lenght: lenght = 20, 
        page = '1', 
        minPrice: number = 0,
        maxPrice: number = 999999
    ){
    try {

        if(urlRelativa && !convert){ 
            const newUrl = `/products${category}?_page=${page}&_limit=${lenght}`

            const { data, headers } = await ApiTest(newUrl)

            const filteredPriceData = data.filter((product: IProducts) => {
                if(typeof product.price === 'string'){
                    const price = parseFloat(product.price.replace('R$', '').replace('$', '').replace(',', ''))
                    return price >= minPrice && price <= maxPrice
                }
                return product.price >= minPrice && product.price <= maxPrice
            })

            const dataWithProductPriceNumber = formaProductPrice(filteredPriceData as IProducts[])

            return {
                data: dataWithProductPriceNumber,
                totalCount: Number(headers['x-total-count'])
            }
        }

        if (urlRelativa && convert) {
            const newUrl = `/products${category}?_page=${page}&_limit=${lenght}`
            const { data, headers } = await ApiTest(newUrl)

            const filteredPriceData = data.filter((product: IProducts) => {
                if (typeof product.price === 'string') {
                    const price = parseFloat(product.price.replace('$ ', ''))
                    return price >= minPrice && price <= maxPrice
                }
                return product.price >= minPrice && product.price <= maxPrice
            })

            const dataWithProductPriceNumber = formaProductPrice(filteredPriceData as IProducts[])
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

        const dataWithProductPriceNumber = formaProductPrice(res.data as IProducts[])
        return  dataWithProductPriceNumber

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

export async function getUserById(uuid: number) {
    try {
        const { data } = await ApiTest(`/login/${uuid}`)
        return data as DataApiTeste;
    }catch (error){
        return new Error('API FAKE DESLIGADA: ' + error)
    }
}

export async function createUser(user: Omit<IUser, 'uuid'>){
    try {
        const { data } = await ApiTest.post('/login', user)
        return data as DataApiTeste;
    }catch(error){
        return new Error('API FAKE DESLIGADA: ' + error)
    }
}

export async function login(user: Pick<IUser, 'email' | 'password'>){
    
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

    const uuid = Number(dataUser)
    const user = await getUserById(uuid)
    return user
}