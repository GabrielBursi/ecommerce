"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addInFavorite = void 0;
const models_1 = require("../../models");
const addInFavorite = async (userId, productId) => {
    try {
        if (!productId) {
            return 'ID do produto não encontrado';
        }
        const user = await models_1.User.findOne({ uuid: userId }).exec();
        const product = await models_1.Products.findOne({ uuid: productId }).exec();
        if (!product) {
            return 'Produto não encontrado id';
        }
        if (!user) {
            return 'Usuário não encontrado id';
        }
        const productIsAlreadyFavorite = user.favorites.find((product) => product.uuid === productId);
        if (user.favorites.length === 0) { //*QUANDO O FAVORITOS ESTÁ VAZIO (NULL)
            const newFavorite = [
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
        }
        else if (user.favorites.length > 0 && !productIsAlreadyFavorite) { //*QUANDO O FAVORITOS NÃO ESTÁ VAZIO (NULL) E O PRODUTO ADICIONADO NÃO ESTÁ NO CARRINHO
            const newFavorite = [
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
        }
        else if (user.favorites.length > 0 && productIsAlreadyFavorite) { //*QUANDO O FAVORITOS NÃO ESTÁ VAZIO (NULL) E O PRODUTO ADICIONADO JÁ ESTÁ NO CARRINHO
            return 'Produto já está nos favoritos';
        }
        const updatedUser = await models_1.User.findOneAndUpdate({ uuid: userId }, { favorites: user.favorites }, { new: true }).populate('favorites.products').exec();
        return updatedUser?.favorites;
    }
    catch (error) {
        return new Error('Erro ao consultar registro: ' + error);
    }
};
exports.addInFavorite = addInFavorite;
