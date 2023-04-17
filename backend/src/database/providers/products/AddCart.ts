import { IProducts } from "../../../types";
import { Products, User } from "../../models"

export const addInCart = async (userId: string, productId: string) => {
    try {
        const user = await User.findOne({ uuid: userId }).exec();
        const product = await Products.findOne({ uuid: productId }).exec();

        if (!product) {
            return new Error('Produto não encontrado id: ' + productId);
        }

        if (!user) {
            return new Error('Usuário não encontrado id: ' + userId);
        }

        const productIsAlreadyCart = user.cart.products.find((product) => product.uuid === productId)
        if (user.cart.products.length === 0) { //*QUANDO O CARRINHO ESTÁ VAZIO (NULL)
            const newCart: IProducts[] = [
                {
                    img: product.img,
                    name: product.name,
                    price: product.price,
                    uuid: product.uuid,
                    rating: product.rating,
                    quant: 1,
                }
            ];
            user.cart.products = newCart;
        } else if (user.cart.products.length > 0 && !productIsAlreadyCart) { //*QUANDO O CARRINHO NÃO ESTÁ VAZIO (NULL) E O PRODUTO ADICIONADO NÃO ESTÁ NO CARRINHO
            const newCart: IProducts[] = [
                ...user.cart.products,
                {
                    img: product.img,
                    name: product.name,
                    price: product.price,
                    uuid: product.uuid,
                    rating: product.rating,
                    quant: 1,
                }
            ];
            user.cart.products = newCart;
        } else if (user.cart.products.length > 0 && productIsAlreadyCart) { //*QUANDO O CARRINHO NÃO ESTÁ VAZIO (NULL) E O PRODUTO ADICIONADO JÁ ESTÁ NO CARRINHO
            const existingProductIndex = user.cart.products.findIndex(p => p.uuid === productId);
            user.cart.products[existingProductIndex].quant++
        }

        const updatedUser = await User.findOneAndUpdate({ uuid: userId }, { cart: user.cart }, { new: true }).populate('cart.products').exec();
        return updatedUser?.cart?.products;
    } catch (error) {
        return new Error('Erro ao consultar registro: ' + error);
    }
}