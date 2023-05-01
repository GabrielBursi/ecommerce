import { User } from "../../models"

export const clear = async (userId: string) => {
    try {
        if (!userId) {
            return 'ID do usuário não encontrado'
        }
        const user = await User.findOneAndUpdate({ uuid: userId }, { cart: { total: 0, products: [] } }, { new: true }).exec();

        if (!user) {
            return 'Usuário não encontrado id'
        }

        return user.cart.products;
    } catch (error) {
        return new Error('Erro ao consultar registro: ' + error);
    }
}