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
exports.getUser = exports.getUserValidation = void 0;
const yup = __importStar(require("yup"));
const http_status_codes_1 = require("http-status-codes");
const middleware_1 = require("../../shared/middleware");
require("../../shared/services/TraducoesYup");
const providers_1 = require("../../database/providers");
const services_1 = require("../../shared/services");
const paramsSchemaValidation = yup.object({
    email: yup.string().email().required(),
});
const bodySchemaValidation = yup.object({
    accessToken: yup.string().required(),
});
exports.getUserValidation = (0, middleware_1.validation)({
    params: paramsSchemaValidation,
    body: bodySchemaValidation
});
const getUser = async (req, res) => {
    const email = req.params.email;
    const token = req.body.accessToken;
    const user = await providers_1.UsersProviders.getByEmail(email);
    if (user instanceof Error)
        return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
            errors: {
                default: 'Email ou senha incorretos.'
            }
        });
    if (typeof user === 'string')
        return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
            errors: {
                default: user
            }
        });
    const accessToken = services_1.JWTService.verify(token);
    if (accessToken === 'JWT_NOT_FOUND')
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: 'Erro ao gerar token de acesso',
            },
        });
    if (accessToken === 'INVALID_TOKEN')
        return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
            errors: {
                default: 'Token não é válido.',
            },
        });
    res.header("x-user-id", user.uuid);
    return res.status(http_status_codes_1.StatusCodes.OK).json({ accessToken: token, user });
};
exports.getUser = getUser;
