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
exports.ProductsController = void 0;
const getAllProducts = __importStar(require("./GetAllProducts"));
const getProductsByCategory = __importStar(require("./GetProductsByCategory"));
const getProductById = __importStar(require("./GetProductById"));
const addCart = __importStar(require("./AddCart"));
const addFavorite = __importStar(require("./AddFavorites"));
const purchase = __importStar(require("./Purchase"));
const addProductInDb = __importStar(require("./AddProducts"));
const clearCart = __importStar(require("./ClearCart"));
const excludeProductCart = __importStar(require("./ExcludeProductInCart"));
const excludeProductFavorite = __importStar(require("./ExcludeProductInFavorite"));
const quantProduct = __importStar(require("./QuantProduct"));
exports.ProductsController = {
    ...getAllProducts,
    ...getProductById,
    ...addFavorite,
    ...addCart,
    ...purchase,
    ...addProductInDb,
    ...clearCart,
    ...excludeProductCart,
    ...excludeProductFavorite,
    ...quantProduct,
    ...getProductsByCategory
};
