"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWTService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signIn = (data) => {
    if (!process.env.JWT_SECRET)
        return 'JWT_SECRET_NOT_FOUND';
    return jsonwebtoken_1.default.sign(data, process.env.JWT_SECRET, { expiresIn: '24h' });
};
const verify = (token) => {
    if (!process.env.JWT_SECRET)
        return 'JWT_NOT_FOUND';
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        if (typeof decoded === 'string')
            return 'INVALID_TOKEN';
        return decoded;
    }
    catch (error) {
        return 'INVALID_TOKEN';
    }
};
exports.JWTService = {
    signIn,
    verify
};
