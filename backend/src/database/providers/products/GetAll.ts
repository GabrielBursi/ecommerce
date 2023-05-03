import { Products } from "../../models"

export const getAll = async () => {
    try {
        const products = await Products.find({category: 'home'}).exec()
        return products
    } catch (error) {
        return new Error('Erro ao consultar registro: ' + error)
    }
}