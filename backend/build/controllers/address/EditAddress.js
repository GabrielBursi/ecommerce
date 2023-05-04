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
exports.EditAddress = exports.editAddressValidation = void 0;
const http_status_codes_1 = require("http-status-codes");
const yup = __importStar(require("yup"));
const providers_1 = require("../../database/providers");
const middleware_1 = require("../../shared/middleware");
require("../../shared/services/TraducoesYup");
const paramsSchemaValidation = yup.object({
    cep: yup.string().required(),
});
const bodySchemaValidation = yup.object({
    identification: yup.string().required(),
    number: yup.string().required(),
    complement: yup.string(),
    ref: yup.string(),
});
exports.editAddressValidation = (0, middleware_1.validation)({
    params: paramsSchemaValidation,
    body: bodySchemaValidation
});
const EditAddress = async (req, res) => {
    const { cep } = req.params;
    const newAddressInfo = req.body;
    const userId = res.locals.userId;
    const addressEdited = await providers_1.AddressProviders.edit(userId, cep, newAddressInfo);
    if (addressEdited instanceof Error)
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: addressEdited.message
            }
        });
    if (addressEdited === 'Usuário não encontrado')
        return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
            errors: {
                default: addressEdited
            }
        });
    if (addressEdited === 'Usuário não possui esse CEP cadastrado')
        return res.status(http_status_codes_1.StatusCodes.CONFLICT).json({
            errors: {
                default: addressEdited
            }
        });
    return res.status(http_status_codes_1.StatusCodes.OK).json({ addressEdited });
};
exports.EditAddress = EditAddress;
