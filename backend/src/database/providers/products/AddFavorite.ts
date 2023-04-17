import { IProducts } from "../../../types";
import { Products, User } from "../../models";

export const addInFavorite = async (userId: string, productId: string) => {
    try {
        const user = await User.findOne({ uuid: userId }).exec();
        const product = await Products.findOne({ uuid: productId }).exec();

        if (!product) {
            return new Error('Produto não encontrado id: ' + productId);
        }

        if (!user) {
            return new Error('Usuário não encontrado id: ' + userId);
        }

        const productIsAlreadyFavorite = user.favorites.products.find((product) => product.uuid === productId)
        if (user.favorites.products.length === 0) { //*QUANDO O FAVORITOS ESTÁ VAZIO (NULL)
            const newFavorite: IProducts[] = [
                {
                    img: product.img,
                    name: product.name,
                    price: product.price,
                    uuid: product.uuid,
                    rating: product.rating,
                    quant: 1
                }
            ];
            user.favorites.products = newFavorite;
        } else if (user.favorites.products.length > 0 && !productIsAlreadyFavorite) { //*QUANDO O FAVORITOS NÃO ESTÁ VAZIO (NULL) E O PRODUTO ADICIONADO NÃO ESTÁ NO CARRINHO
            const newFavorite: IProducts[] = [
                ...user.favorites.products,
                {
                    img: product.img,
                    name: product.name,
                    price: product.price,
                    uuid: product.uuid,
                    rating: product.rating,
                    quant: 1
                }
            ];
            user.favorites.products = newFavorite;
        } else if (user.favorites.products.length > 0 && productIsAlreadyFavorite) { //*QUANDO O FAVORITOS NÃO ESTÁ VAZIO (NULL) E O PRODUTO ADICIONADO JÁ ESTÁ NO CARRINHO
            return new Error('Produto já está nos favoritos');
        }

        const updatedUser = await User.findOneAndUpdate({ uuid: userId }, { favorites: user.favorites }, { new: true }).populate('favorites.products').exec();
        return updatedUser?.favorites?.products;
    } catch (error) {
        return new Error('Erro ao consultar registro: ' + error);
    }
}