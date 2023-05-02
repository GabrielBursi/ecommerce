import { IProducts } from "../../../types";
import { somePrice } from "../../../utils";
import { Products, User } from "../../models"

export const addInCart = async (userId: string, productId: string | undefined) => {
    try {
        if(!productId){
            return 'ID do produto não encontrado'
        }

        const user = await User.findOne({ uuid: userId }).exec();
        const product = await Products.findOne({ uuid: productId }).exec();

        if (!product) {
            return 'Produto não encontrado id'
        }

        if (!user) {
            return 'Usuário não encontrado id'
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

        const optionDeliverySelected = user.deliveryOptions.filter(opt => opt.selected === true)

        const total = somePrice(user.cart.products, optionDeliverySelected[0])

        const updatedUser = await User.findOneAndUpdate({ uuid: userId }, { cart: {total, products: user.cart.products} }, { new: true }).populate('cart.products').exec();
        return updatedUser?.cart;
    } catch (error) {
        return new Error('Erro ao consultar registro: ' + error);
    }
}