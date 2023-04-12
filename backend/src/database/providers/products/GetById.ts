import { Products } from "../../models"

export const getById = async (id: string) => {
    try {
        const product = await Products.findOne({id}).exec()
        if(!product){
            return new Error('Produto não encontrado pelo id: ' + id)
        }
        return product
    } catch (error) {
        return new Error('Erro ao consultar registro: ' + error)
    }
}