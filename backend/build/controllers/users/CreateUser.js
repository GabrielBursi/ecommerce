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
exports.CreateUser = exports.createUserValidation = void 0;
const yup = __importStar(require("yup"));
const http_status_codes_1 = require("http-status-codes");
const middleware_1 = require("../../shared/middleware");
const providers_1 = require("../../database/providers");
const services_1 = require("../../shared/services");
require("../../shared/services/TraducoesYup");
const bodySchemaValidation = yup.object({
    name: yup.string().min(2).required(),
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
    confirmPassword: yup.string().oneOf([yup.ref('password')]).required(),
    cpf: yup.string().required().matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/),
});
exports.createUserValidation = (0, middleware_1.validation)({
    body: bodySchemaValidation,
});
const CreateUser = async (req, res) => {
    const user = await providers_1.UsersProviders.create(req.body);
    if (user instanceof Error)
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: user.message
            }
        });
    if (typeof user === 'string')
        return res.status(http_status_codes_1.StatusCodes.CONFLICT).json({
            errors: {
                default: user
            }
        });
    const accessToken = services_1.JWTService.signIn({ uid: user.uuid });
    if (accessToken === 'JWT_SECRET_NOT_FOUND')
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: 'Erro ao gerar token de acesso',
            },
        });
    res.header("x-user-id", user.uuid);
    return res.status(http_status_codes_1.StatusCodes.CREATED).json({ accessToken, user });
};
exports.CreateUser = CreateUser;
