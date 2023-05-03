import { IDelivery } from "../../../types";
import { somePrice } from "../../../utils";
import { User } from "../../models"

export const select = async (userId: string, name: string) => {
    try {
        const user = await User.findOne({ uuid: userId }).exec()

        if (!user) {
            return 'Usuário não encontrado'
        }

        const selectedOption = user.deliveryOptions.find(option => option.name === name);

        if (!selectedOption) {
            return 'Opção de entrega não encontrada.'
        }

        const deliveryOptions: IDelivery[] = user.deliveryOptions.map(option => {
            if (option.name !== name) {
                return { ...option, selected: false }
            }
            return { ...selectedOption, selected: true }
        })

        const total = somePrice(user.cart.products, selectedOption)

        const optionsUpdated = await User.findOneAndUpdate({ uuid: userId }, { deliveryOptions, cart: { ...user.cart, total } }, { new: true }).exec()
        const totalWithOptions = {
            total: optionsUpdated?.cart.total,
            options: optionsUpdated?.deliveryOptions
        }
        return totalWithOptions
    } catch (error) {
        return new Error('Erro ao consultar o registro');
    }
}