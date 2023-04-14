import { v4 as uuidv4 } from 'uuid';
import { IProducts } from "../../../types"
import { Products } from "../../models"

export const createProduct = async (products: IProducts[]): Promise<IProducts[] | Error> => {
    try {

        const newProducts = products.map(product => {
            const newProduct = new Products({
                ...product,
                uuid: uuidv4(),
            })

            return newProduct
        })
        
        const savedProducts = await Promise.all(newProducts.map(product => product.save()))
        return [...savedProducts]

    } catch (error) {
        console.log(error);
        return new Error('Erro ao criar registro: ' + error)
    }
}