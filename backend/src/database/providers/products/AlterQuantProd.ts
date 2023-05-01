import { somePrice } from "../../../utils"
import { User } from "../../models"

export const alterQuant = async (userId: string, productId: string | undefined, action: '+' | '-') => {
    try {
        if (!productId) {
            return 'ID do produto não encontrado'
        }

        const user = await User.findOne({ uuid: userId }).exec()

        if (!user) {
            return "Usuário não encontrado."
        }

        const indexAltered = user.cart.products.findIndex(product => product.uuid === productId)
        if (indexAltered === -1) {
            return "Produto não encontrado no carrinho."
        }

        switch(action){
            case '+':
                user.cart.products[indexAltered].quant++
                break;
            case '-':
                if (user.cart.products[indexAltered].quant === 1) {
                    return "Produto com uma quantidade."
                }
                user.cart.products[indexAltered].quant--
                break;
        }
        
        const total = somePrice(user.cart.products)

        const updatedUser = await User.findOneAndUpdate({ uuid: userId }, { cart: { total, products: user.cart.products } }, { new: true }).exec();
        return updatedUser?.cart;

    } catch (error) {
        return new Error("Erro ao consultar registros." + error)
    }
}