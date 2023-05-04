"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getByCategory = void 0;
const models_1 = require("../../models");
const getByCategory = async (category, filter) => {
    try {
        const query = {
            category,
            price: {
                $gte: filter.price.min,
                $lte: filter.price.max
            }
        };
        const [products, totalCount] = await Promise.all([
            models_1.Products.find(query)
                .skip(filter.skip)
                .limit(filter.exibir)
                .exec(),
            models_1.Products.countDocuments(query),
        ]);
        return { products, totalCount };
    }
    catch (error) {
        return new Error('Erro ao consultar registro: ' + error);
    }
};
exports.getByCategory = getByCategory;
