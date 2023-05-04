"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClearCart = void 0;
const http_status_codes_1 = require("http-status-codes");
const providers_1 = require("../../database/providers");
const ClearCart = async (req, res) => {
    const userId = res.locals.userId;
    const cartDeleted = await providers_1.ProductsProviders.clear(userId);
    if (cartDeleted instanceof Error)
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: cartDeleted.message
            }
        });
    if (cartDeleted === 'ID do usuário não encontrado' || cartDeleted === 'Usuário não encontrado id')
        return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
            errors: {
                default: cartDeleted
            }
        });
    return res.status(http_status_codes_1.StatusCodes.NO_CONTENT).json({ cartDeleted });
};
exports.ClearCart = ClearCart;
