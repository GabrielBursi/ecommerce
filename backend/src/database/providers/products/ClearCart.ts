import { User } from "../../models"

export const clear = async (userId: string) => {
    try {
        if (!userId) {
            return new Error('ID do usuário não definido: ' + userId)
        }
        const user = await User.findOneAndUpdate({ uuid: userId }, { cart: [] }, { new: true }).exec();

        if (!user) {
            return new Error('Usuário não encontrado id: ' + userId);
        }

        return user.cart;
    } catch (error) {
        return new Error('Erro ao consultar registro: ' + error);
    }
}