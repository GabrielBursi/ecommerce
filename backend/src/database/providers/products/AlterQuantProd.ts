import { User } from "../../models"

export const alterQuant = async (userId: string, productId: string | undefined, action: '+' | '-') => {
    try {
        if (!productId) {
            return new Error('ID do produto não encontrado: ' + productId);
        }

        const user = await User.findOne({ uuid: userId }).exec()

        if (!user) {
            return new Error("Usuário não encontrado.")
        }

        const indexAltered = user.cart.findIndex(product => product.uuid === productId)
        if (indexAltered === -1) {
            return new Error("Produto não encontrado no carrinho.")
        }

        switch(action){
            case '+':
                user.cart[indexAltered].quant++
                break;
            case '-':
                if (user.cart[indexAltered].quant === 1) {
                    return new Error("Produto com uma quantidade.")
                }
                user.cart[indexAltered].quant--
                break;
        }
        
        const updatedUser = await User.findOneAndUpdate({ uuid: userId }, { cart: user.cart }, { new: true }).exec();
        return updatedUser?.cart;

    } catch (error) {
        return new Error("Erro ao consultar registros." + error)
    }
}