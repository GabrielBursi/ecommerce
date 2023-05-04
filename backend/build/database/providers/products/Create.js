"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProduct = void 0;
const uuid_1 = require("uuid");
const models_1 = require("../../models");
const createProduct = async (products, category) => {
    try {
        const newProducts = products.map(product => {
            const newProduct = new models_1.Products({
                ...product,
                uuid: (0, uuid_1.v4)(),
                category
            });
            return newProduct;
        });
        const savedProducts = await Promise.all(newProducts.map(product => product.save()));
        return [...savedProducts];
    }
    catch (error) {
        console.log(error);
        return new Error('Erro ao criar registro: ' + error);
    }
};
exports.createProduct = createProduct;
