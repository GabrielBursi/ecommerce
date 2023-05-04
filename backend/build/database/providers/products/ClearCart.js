"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clear = void 0;
const models_1 = require("../../models");
const clear = async (userId) => {
    try {
        if (!userId) {
            return 'ID do usuário não encontrado';
        }
        const user = await models_1.User.findOneAndUpdate({ uuid: userId }, { cart: { total: 0, products: [] } }, { new: true }).exec();
        if (!user) {
            return 'Usuário não encontrado id';
        }
        return user.cart.products;
    }
    catch (error) {
        return new Error('Erro ao consultar registro: ' + error);
    }
};
exports.clear = clear;
