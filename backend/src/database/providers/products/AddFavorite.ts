import { IProducts } from "../../../types";
import { Products, User } from "../../models";

export const addInFavorite = async (userId: string, productId: string | undefined) => {
    try {
        if (!productId) {
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

        const productIsAlreadyFavorite = user.favorites.find((product) => product.uuid === productId)
        if (user.favorites.length === 0) { //*QUANDO O FAVORITOS ESTÁ VAZIO (NULL)
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
            user.favorites = newFavorite;
        } else if (user.favorites.length > 0 && !productIsAlreadyFavorite) { //*QUANDO O FAVORITOS NÃO ESTÁ VAZIO (NULL) E O PRODUTO ADICIONADO NÃO ESTÁ NO CARRINHO
            const newFavorite: IProducts[] = [
                ...user.favorites,
                {
                    img: product.img,
                    name: product.name,
                    price: product.price,
                    uuid: product.uuid,
                    rating: product.rating,
                    quant: 1
                }
            ];
            user.favorites = newFavorite;
        } else if (user.favorites.length > 0 && productIsAlreadyFavorite) { //*QUANDO O FAVORITOS NÃO ESTÁ VAZIO (NULL) E O PRODUTO ADICIONADO JÁ ESTÁ NO CARRINHO
            return 'Produto já está nos favoritos'
        }

        const updatedUser = await User.findOneAndUpdate({ uuid: userId }, { favorites: user.favorites }, { new: true }).populate('favorites.products').exec();
        return updatedUser?.favorites;
    } catch (error) {
        return new Error('Erro ao consultar registro: ' + error);
    }
}