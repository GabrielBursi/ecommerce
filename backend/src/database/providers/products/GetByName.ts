import { Products } from "../../models"

export const getByName = async (name: string | undefined) => {
    try {

        if(!name){
            return 'Informe o nome do produto.'
        }   

        const products = await Products.find({ name: { $regex: name, $options: 'i' } }).exec()

        if (!products || products.length === 0) {
            return 'Nenhum produto encontrado.'
        }
        return products
    } catch (error) {
        return new Error('Erro ao consultar registro: ' + error)
    }
}