"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.select = void 0;
const utils_1 = require("../../../utils");
const models_1 = require("../../models");
const select = async (userId, name) => {
    try {
        const user = await models_1.User.findOne({ uuid: userId }).exec();
        if (!user) {
            return 'Usuário não encontrado';
        }
        const selectedOption = user.deliveryOptions.find(option => option.name === name);
        if (!selectedOption) {
            return 'Opção de entrega não encontrada.';
        }
        const deliveryOptions = user.deliveryOptions.map(option => {
            if (option.name !== name) {
                return { ...option, selected: false };
            }
            return { ...selectedOption, selected: true };
        });
        const total = (0, utils_1.somePrice)(user.cart.products, selectedOption);
        const optionsUpdated = await models_1.User.findOneAndUpdate({ uuid: userId }, { deliveryOptions, cart: { ...user.cart, total } }, { new: true }).exec();
        const totalWithOptions = {
            total: optionsUpdated?.cart.total,
            options: optionsUpdated?.deliveryOptions
        };
        return totalWithOptions;
    }
    catch (error) {
        return new Error('Erro ao consultar o registro');
    }
};
exports.select = select;
