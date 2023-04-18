import { Products } from "../../models"

export const getById = async (id: string | undefined) => {
    try {
        if(!id){
            return new Error('ID do produto não encontrado: ' + id)
        }

        const product = await Products.findOne({uuid: id}).exec()

        if(!product){
            return new Error('Produto não encontrado pelo id: ' + id)
        }
        return product
    } catch (error) {
        return new Error('Erro ao consultar registro: ' + error)
    }
}