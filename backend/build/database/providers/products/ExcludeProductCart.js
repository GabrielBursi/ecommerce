"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.excludeProductCart = void 0;
const utils_1 = require("../../../utils");
const models_1 = require("../../models");
const excludeProductCart = async (userId, productId) => {
    try {
        if (!productId) {
            return 'ID do produto não encontrado';
        }
        const user = await models_1.User.findOne({ uuid: userId }).exec();
        if (!user) {
            return "Usuário não encontrado";
        }
        const indexDeleted = user.cart.products.findIndex(product => product.uuid === productId);
        if (indexDeleted === -1) {
            return "Produto não encontrado no carrinho";
        }
        user.cart.products.splice(indexDeleted, 1);
        const optionDeliverySelected = user.deliveryOptions.filter(opt => opt.selected === true);
        const total = (0, utils_1.somePrice)(user.cart.products, optionDeliverySelected[0]);
        const updatedUser = await models_1.User.findOneAndUpdate({ uuid: userId }, { cart: { total, products: user.cart.products } }, { new: true }).exec();
        return updatedUser?.cart;
    }
    catch (error) {
        return new Error("Erro ao consultar registros." + error);
    }
};
exports.excludeProductCart = excludeProductCart;
