"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllProducts = void 0;
const http_status_codes_1 = require("http-status-codes");
const providers_1 = require("../../database/providers");
require("../../shared/services/TraducoesYup");
const GetAllProducts = async (req, res) => {
    const products = await providers_1.ProductsProviders.getAll();
    if (products instanceof Error)
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: products.message
            }
        });
    return res.status(http_status_codes_1.StatusCodes.OK).json({ products });
};
exports.GetAllProducts = GetAllProducts;
