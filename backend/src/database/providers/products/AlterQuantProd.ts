import { User } from "../../models"

export const alterQuant = async (userId: string | undefined, productId: string | undefined, action: '+' | '-') => {
    try {
        if (!userId || !productId) {
            return new Error("ID do usuário ou ID do produto não encontrados.")
        }

        const user = await User.findOne({ uuid: userId }).exec()

        if (!user) {
            return new Error("Usuário não encontrado.")
        }

        const indexAltered = user.cart.products.findIndex(product => product.uuid === productId)
        if (indexAltered === -1) {
            return new Error("Produto não encontrado no carrinho.")
        }

        switch(action){
            case '+':
                user.cart.products[indexAltered].quant++
                break;
            case '-':
                if (user.cart.products[indexAltered].quant === 1) {
                    return new Error("Produto com uma quantidade.")
                }
                user.cart.products[indexAltered].quant--
                break;
        }
        
        const updatedUser = await User.findOneAndUpdate({ uuid: userId }, { cart: user.cart }, { new: true }).exec();
        return updatedUser?.cart.products;

    } catch (error) {
        return new Error("Erro ao consultar registros." + error)
    }
}