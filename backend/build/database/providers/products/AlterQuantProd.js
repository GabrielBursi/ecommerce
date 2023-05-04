"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.alterQuant = void 0;
const utils_1 = require("../../../utils");
const models_1 = require("../../models");
const alterQuant = async (userId, productId, action) => {
    try {
        if (!productId) {
            return 'ID do produto não encontrado';
        }
        const user = await models_1.User.findOne({ uuid: userId }).exec();
        if (!user) {
            return "Usuário não encontrado.";
        }
        const indexAltered = user.cart.products.findIndex(product => product.uuid === productId);
        if (indexAltered === -1) {
            return "Produto não encontrado no carrinho.";
        }
        switch (action) {
            case '+':
                user.cart.products[indexAltered].quant++;
                break;
            case '-':
                if (user.cart.products[indexAltered].quant === 1) {
                    return "Produto com uma quantidade.";
                }
                user.cart.products[indexAltered].quant--;
                break;
        }
        const optionDeliverySelected = user.deliveryOptions.filter(opt => opt.selected === true);
        const total = (0, utils_1.somePrice)(user.cart.products, optionDeliverySelected[0]);
        const updatedUser = await models_1.User.findOneAndUpdate({ uuid: userId }, { cart: { total, products: user.cart.products } }, { new: true }).exec();
        return updatedUser?.cart;
    }
    catch (error) {
        return new Error("Erro ao consultar registros." + error);
    }
};
exports.alterQuant = alterQuant;
