"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAll = void 0;
const models_1 = require("../../models");
const getAll = async () => {
    try {
        const products = await models_1.Products.find({ category: 'home' }).exec();
        return products;
    }
    catch (error) {
        return new Error('Erro ao consultar registro: ' + error);
    }
};
exports.getAll = getAll;
