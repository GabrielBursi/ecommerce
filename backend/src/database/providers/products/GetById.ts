import { Products } from "../../models"

export const getById = async (id: string | undefined) => {
    try {
        if(!id){
            return 'ID do produto não encontrado' 
        }

        const product = await Products.findOne({uuid: id}).exec()

        if(!product){
            return 'Produto não encontrado pelo id' 
        }
        return product
    } catch (error) {
        return new Error('Erro ao consultar registro: ' + error)
    }
}