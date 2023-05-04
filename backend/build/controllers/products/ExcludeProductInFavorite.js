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
exports.ExcludeProductFavorite = exports.excludeProductFavoriteValidation = void 0;
const yup = __importStar(require("yup"));
const http_status_codes_1 = require("http-status-codes");
const middleware_1 = require("../../shared/middleware");
const providers_1 = require("../../database/providers");
const paramsSchemaValidation = yup.object({
    id: yup.string().required(),
});
exports.excludeProductFavoriteValidation = (0, middleware_1.validation)({
    params: paramsSchemaValidation
});
const ExcludeProductFavorite = async (req, res) => {
    const { id: productId } = req.params;
    const userId = res.locals.userId;
    const productDeleted = await providers_1.ProductsProviders.excludeProductFavorite(userId, productId);
    if (productDeleted instanceof Error)
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: productDeleted.message
            }
        });
    if (productDeleted === 'ID do produto não encontrado' || productDeleted === 'Produto não encontrado nos favoritos.' || productDeleted === 'Usuário não encontrado.')
        return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
            errors: {
                default: productDeleted
            }
        });
    return res.status(http_status_codes_1.StatusCodes.OK).json({ productDeleted });
};
exports.ExcludeProductFavorite = ExcludeProductFavorite;
