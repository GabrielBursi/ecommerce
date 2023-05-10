import { User } from "../../models"

export const clear = async (userId: string) => {
    try {
        if (!userId) {
            return 'ID do usuário não encontrado'
        }
        const user = await User.findOne({ uuid: userId }).exec();

        if (!user) {
            return 'Usuário não encontrado id'
        }

        const optionDeliverySelected = user.deliveryOptions.find(opt => opt.selected === true)

        const userUpdated = await User.findOneAndUpdate({ uuid: userId }, { cart: { total: optionDeliverySelected?.price, products: [] } }, { new: true }).exec();

        return userUpdated?.cart.products;
    } catch (error) {
        return new Error('Erro ao consultar registro: ' + error);
    }
}