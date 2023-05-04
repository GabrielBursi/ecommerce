"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllDeliveryOptions = void 0;
const http_status_codes_1 = require("http-status-codes");
const providers_1 = require("../../database/providers");
require("../../shared/services/TraducoesYup");
const GetAllDeliveryOptions = async (req, res) => {
    const userId = res.locals.userId;
    const deliveryOptions = await providers_1.DeliveryProviders.getAll(userId);
    if (deliveryOptions instanceof Error)
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: deliveryOptions.message
            }
        });
    if (deliveryOptions === 'Usuário não encontrado.')
        return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
            errors: {
                default: deliveryOptions
            }
        });
    return res.status(http_status_codes_1.StatusCodes.OK).json({ deliveryOptions });
};
exports.GetAllDeliveryOptions = GetAllDeliveryOptions;
