import { User } from "../../models"

export const excludeProductCart = async (userId: string | undefined, productId: string | undefined) => {
    try {
        if (!userId || !productId) {
            return new Error("ID do usuário ou ID do produto não encontrados.")
        }

        const user = await User.findOne({ uuid: userId }).exec()

        if (!user) {
            return new Error("Usuário não encontrado.")
        }

        const indexDeleted = user.cart.products.findIndex(product => product.uuid === productId)
        if(indexDeleted === -1) {
            return new Error("Produto não encontrado no carrinho.")
        }
        user.cart.products.splice(indexDeleted, 1)

        const updatedUser = await User.findOneAndUpdate({ uuid: userId }, { cart: user.cart }, { new: true }).exec();
        return updatedUser?.cart.products;

    } catch (error) {
        return new Error("Erro ao consultar registros." + error)
    }
    
}