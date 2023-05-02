import { User } from "../../models"

export const getAll = async (userId: string) => {
    try {
        const user = await User.findOne({uuid: userId}).exec()

        if(!user){
            return 'Usuário não encontrado.'
        }

        return user.deliveryOptions
    } catch (error) {
        return new Error('Erro ao consultar registro: ' + error)
    }
}