"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatProductPrice = void 0;
const http_status_codes_1 = require("http-status-codes");
const utils_1 = require("../../../utils");
const formatProductPrice = async (req, res, next) => {
    const newProducts = res.locals.newProducts;
    const convert = res.locals.convert;
    const newProductsWithPriceFormated = (0, utils_1.formaProductPrice)(newProducts);
    if (!convert) {
        res.locals.newProductsWithPriceFormated = newProductsWithPriceFormated;
    }
    else {
        const newProductsWithPriceFormatedAndConverted = await (0, utils_1.convertCurrency)(newProductsWithPriceFormated, 0.6);
        if (newProductsWithPriceFormatedAndConverted instanceof Error) {
            return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
                errors: {
                    default: newProductsWithPriceFormatedAndConverted.message
                }
            });
        }
        res.locals.newProductsWithPriceFormated = newProductsWithPriceFormatedAndConverted;
    }
    next();
};
exports.formatProductPrice = formatProductPrice;
