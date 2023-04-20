import { User } from "../../models";

export const getByEmail = async (email: string) => {
    try {
        const user = await User.findOne({ email }).exec()
        
        if(!user){
            return 'Usuário não encontrado'
        }

        return user

    } catch (error) {
        return new Error('Erro ao consultar o registro');
    }
};