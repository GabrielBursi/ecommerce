"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchProducts = void 0;
const http_status_codes_1 = require("http-status-codes");
const services_1 = require("../../services");
const providers_1 = require("../../../database/providers");
const utils_1 = require("../../../utils");
const fetchProducts = async (req, res, next) => {
    const { page, query, convert = false, category } = req.body;
    const items = [];
    try {
        for (const queryItem of query) {
            const productsApi = await (0, services_1.Api)(queryItem, page);
            if (productsApi instanceof Error) {
                const products = await providers_1.ProductsProviders.createProduct(utils_1.arrayTESTE, category);
                return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
                    errors: {
                        default: productsApi.message
                    },
                    products
                });
            }
            if (productsApi[0].title.startsWith('Anúncio patrocinado')) {
                continue;
            }
            items.push(productsApi[0]);
        }
        res.locals.items = items;
        res.locals.convert = convert;
        next();
    }
    catch (err) {
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: 'Failed to fetch products'
            }
        });
    }
};
exports.fetchProducts = fetchProducts;
