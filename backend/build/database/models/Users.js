"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    uuid: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    confirmPassword: { type: String, required: true },
    cpf: { type: String, required: true },
    address: { type: mongoose_1.Schema.Types.Mixed, default: [] },
    favorites: { type: mongoose_1.Schema.Types.Mixed, default: [] },
    cart: {
        total: { type: Number, required: true, default: 0 },
        products: { type: Array, required: true, default: [] }
    },
    myOrders: { type: mongoose_1.Schema.Types.Mixed, default: [] },
    deliveryOptions: { type: mongoose_1.Schema.Types.Mixed, default: [] }
});
exports.User = (0, mongoose_1.model)('User', userSchema);
