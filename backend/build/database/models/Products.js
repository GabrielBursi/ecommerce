"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Products = void 0;
const mongoose_1 = require("mongoose");
const productsSchema = new mongoose_1.Schema({
    uuid: { type: String, required: true },
    img: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    rating: { type: Number, required: true },
    quant: { type: Number, required: false, default: 0 },
    category: { type: String, required: true }
});
exports.Products = (0, mongoose_1.model)('Products', productsSchema);
