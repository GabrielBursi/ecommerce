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
exports.Purchase = exports.createMyOrderValidation = void 0;
const yup = __importStar(require("yup"));
const http_status_codes_1 = require("http-status-codes");
const middleware_1 = require("../../shared/middleware");
const providers_1 = require("../../database/providers");
require("../../shared/services/TraducoesYup");
const bodySchemaValidation = yup.object({
    info: yup.object({
        number: yup.string().required(),
        status: yup.boolean().default(true).required(),
        date: yup.string().required(),
        payment: yup.string().required(),
    }).required(),
});
exports.createMyOrderValidation = (0, middleware_1.validation)({
    body: bodySchemaValidation,
});
const Purchase = async (req, res) => {
    const order = req.body;
    const userId = res.locals.userId;
    const myOrders = await providers_1.ProductsProviders.createMyOrder(userId, order);
    if (myOrders instanceof Error)
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: myOrders.message
            }
        });
    if (myOrders === 'O carrinho está vazio.' || myOrders === 'O numero de pedido já existe.')
        return res.status(http_status_codes_1.StatusCodes.CONFLICT).json({
            errors: {
                default: myOrders
            }
        });
    if (myOrders === 'Usuário não encontrado id' || myOrders === 'Endereço selecionado não encontrado.')
        return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
            errors: {
                default: myOrders
            }
        });
    return res.status(http_status_codes_1.StatusCodes.OK).json({ myOrders });
};
exports.Purchase = Purchase;
