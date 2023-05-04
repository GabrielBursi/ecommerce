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
exports.GetProductsByCategory = exports.filterProductValidation = void 0;
const http_status_codes_1 = require("http-status-codes");
const yup = __importStar(require("yup"));
const providers_1 = require("../../database/providers");
require("../../shared/services/TraducoesYup");
const middleware_1 = require("../../shared/middleware");
const paramsSchemaValidation = yup.object({
    category: yup.string().required()
});
const querySchemaValidation = yup.object({
    page: yup.string().required(),
    min: yup.string().required(),
    max: yup.string().required(),
    exibir: yup.string().required().matches(/^(20|40|60|80|100)$/),
});
exports.filterProductValidation = (0, middleware_1.validation)({
    params: paramsSchemaValidation,
    query: querySchemaValidation
});
const GetProductsByCategory = async (req, res) => {
    const { category } = req.params;
    const { page = '1', min = '1', max = '9999999', exibir = '20' } = req.query;
    const nPage = Number(page);
    const nMin = Number(min);
    const nMax = Number(max);
    const nExibir = Number(exibir);
    const skip = (nPage - 1) * nExibir;
    const filter = {
        skip,
        exibir: nExibir,
        price: {
            min: nMin,
            max: nMax
        }
    };
    const products = await providers_1.ProductsProviders.getByCategory(category || '', filter);
    if (products instanceof Error)
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: products.message
            }
        });
    return res.status(http_status_codes_1.StatusCodes.OK).json(products);
};
exports.GetProductsByCategory = GetProductsByCategory;
