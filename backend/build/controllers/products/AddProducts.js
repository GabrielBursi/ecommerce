"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddProduct = exports.createProductValidation = void 0;
const http_status_codes_1 = require("http-status-codes");
const yup = __importStar(require("yup"));
const providers_1 = require("../../database/providers");
require("../../shared/services/TraducoesYup");
const middleware_1 = require("../../shared/middleware");
const bodySchemaValidation = yup.object({
    query: yup.array().required(),
    category: yup.string().required(),
    page: yup.number(),
    convert: yup.boolean()
});
exports.createProductValidation = (0, middleware_1.validation)({
    body: bodySchemaValidation
});
const AddProduct = async (req, res) => {
    const productsFormated = res.locals.newProductsWithPriceFormated;
    const { category } = req.body;
    if (!productsFormated) {
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: 'Erro no processo de formatação do produto.'
            }
        });
    }
    const products = await providers_1.ProductsProviders.createProduct(productsFormated, category);
    if (products instanceof Error)
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: products.message
            }
        });
    return res.status(http_status_codes_1.StatusCodes.OK).json({ products });
};
exports.AddProduct = AddProduct;
