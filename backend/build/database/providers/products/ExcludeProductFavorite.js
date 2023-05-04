"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.excludeProductFavorite = void 0;
const models_1 = require("../../models");
const excludeProductFavorite = async (userId, productId) => {
    try {
        if (!productId) {
            return 'ID do produto não encontrado';
        }
        const user = await models_1.User.findOne({ uuid: userId }).exec();
        if (!user) {
            return "Usuário não encontrado.";
        }
        const indexDeleted = user.favorites.findIndex(product => product.uuid === productId);
        if (indexDeleted === -1) {
            return "Produto não encontrado nos favoritos.";
        }
        user.favorites.splice(indexDeleted, 1);
        const updatedUser = await models_1.User.findOneAndUpdate({ uuid: userId }, { favorites: user.favorites }, { new: true }).exec();
        return updatedUser?.favorites;
    }
    catch (error) {
        return new Error("Erro ao consultar registros." + error);
    }
};
exports.excludeProductFavorite = excludeProductFavorite;
