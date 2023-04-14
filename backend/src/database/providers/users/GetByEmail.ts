import { User } from "../../models";

export const getByEmail = async (email: string) => {
    try {
        const user = await User.findOne({ email }).exec()
        
        if(user){
            return user
        }

        return new Error('Registro não encontrado');

    } catch (error) {
        console.log(error);
        return new Error('Erro ao consultar o registro');
    }
};