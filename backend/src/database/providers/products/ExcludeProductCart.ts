import { somePrice } from "../../../utils"
import { User } from "../../models"

export const excludeProductCart = async (userId: string, productId: string | undefined) => {
    try {
        if (!productId) {
            return 'ID do produto não encontrado'
        }

        const user = await User.findOne({ uuid: userId }).exec()

        if (!user) {
            return "Usuário não encontrado"
        }

        const indexDeleted = user.cart.products.findIndex(product => product.uuid === productId)
        if(indexDeleted === -1) {
            return "Produto não encontrado no carrinho"
        }
        user.cart.products.splice(indexDeleted, 1)

        const optionDeliverySelected = user.deliveryOptions.filter(opt => opt.selected === true)

        const total = somePrice(user.cart.products, optionDeliverySelected[0])

        const updatedUser = await User.findOneAndUpdate({ uuid: userId }, { cart: { total, products: user.cart.products } }, { new: true }).exec();
        return updatedUser?.cart;

    } catch (error) {
        return new Error("Erro ao consultar registros." + error)
    }
    
}