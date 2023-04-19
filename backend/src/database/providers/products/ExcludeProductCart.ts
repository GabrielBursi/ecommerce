import { User } from "../../models"

export const excludeProductCart = async (userId: string, productId: string | undefined) => {
    try {
        if (!productId) {
            return new Error('ID do produto não encontrado: ' + productId);
        }

        const user = await User.findOne({ uuid: userId }).exec()

        if (!user) {
            return new Error("Usuário não encontrado.")
        }

        const indexDeleted = user.cart.findIndex(product => product.uuid === productId)
        if(indexDeleted === -1) {
            return new Error("Produto não encontrado no carrinho.")
        }
        user.cart.splice(indexDeleted, 1)

        const updatedUser = await User.findOneAndUpdate({ uuid: userId }, { cart: user.cart }, { new: true }).exec();
        return updatedUser?.cart;

    } catch (error) {
        return new Error("Erro ao consultar registros." + error)
    }
    
}