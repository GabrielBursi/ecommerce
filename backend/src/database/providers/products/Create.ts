import { v4 as uuidv4 } from 'uuid';
import { IProducts } from "../../../types"
import { Products } from "../../models"

export const createProduct = async (product: IProducts): Promise<IProducts | Error> => {
    try {

        const newProduct = new Products({
            ...product,
            uuid: uuidv4(),
        })

        await newProduct.save()

        return newProduct

    } catch (error) {
        console.log(error);
        return new Error('Erro ao criar registro: ' + error)
    }
}