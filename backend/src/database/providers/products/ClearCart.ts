import { User } from "../../models"

export const clear = async (userId: string | string[] | undefined) => {
    try {
        if (!userId) {
            return new Error('ID do usuário não definido: ' + userId)
        }
        const user = await User.findOneAndUpdate({ uuid: userId }, { cart: {products: []} }, { new: true }).exec();

        if (!user) {
            return new Error('Usuário não encontrado id: ' + userId);
        }

        return user.cart.products;
    } catch (error) {
        return new Error('Erro ao consultar registro: ' + error);
    }
}