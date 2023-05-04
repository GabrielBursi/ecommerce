"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getByEmail = void 0;
const models_1 = require("../../models");
const getByEmail = async (email) => {
    try {
        const user = await models_1.User.findOne({ email }).exec();
        if (!user) {
            return 'Usuário não encontrado';
        }
        return user;
    }
    catch (error) {
        return new Error('Erro ao consultar o registro');
    }
};
exports.getByEmail = getByEmail;
