"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getById = void 0;
const models_1 = require("../../models");
const getById = async (id) => {
    try {
        if (!id) {
            return 'ID do produto não encontrado';
        }
        const product = await models_1.Products.findOne({ uuid: id }).exec();
        if (!product) {
            return 'Produto não encontrado pelo id';
        }
        return product;
    }
    catch (error) {
        return new Error('Erro ao consultar registro: ' + error);
    }
};
exports.getById = getById;
