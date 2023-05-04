"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAll = void 0;
const models_1 = require("../../models");
const getAll = async (userId) => {
    try {
        const user = await models_1.User.findOne({ uuid: userId }).exec();
        if (!user) {
            return 'Usuário não encontrado.';
        }
        return user.deliveryOptions;
    }
    catch (error) {
        return new Error('Erro ao consultar registro: ' + error);
    }
};
exports.getAll = getAll;
