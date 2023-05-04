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
exports.ProductsProviders = void 0;
const getAll = __importStar(require("./GetAll"));
const getById = __importStar(require("./GetById"));
const addInCart = __importStar(require("./AddCart"));
const addInFavorites = __importStar(require("./AddFavorite"));
const createMyOrder = __importStar(require("./Purchase"));
const create = __importStar(require("./Create"));
const clear = __importStar(require("./ClearCart"));
const excludeCart = __importStar(require("./ExcludeProductCart"));
const excludeFavorite = __importStar(require("./ExcludeProductFavorite"));
const alterQuant = __importStar(require("./AlterQuantProd"));
const getByCategory = __importStar(require("./GetByCategory"));
exports.ProductsProviders = {
    ...getAll,
    ...getById,
    ...addInCart,
    ...addInFavorites,
    ...createMyOrder,
    ...create,
    ...clear,
    ...excludeCart,
    ...excludeFavorite,
    ...alterQuant,
    ...getByCategory
};
