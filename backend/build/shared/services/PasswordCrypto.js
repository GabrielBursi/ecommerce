"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordCrypto = void 0;
const bcrypt_1 = require("bcrypt");
const SALT_ROUNDS = 8;
const hashPassword = async (password) => {
    const saltGenerated = await (0, bcrypt_1.genSalt)(SALT_ROUNDS);
    return await (0, bcrypt_1.hash)(password, saltGenerated);
};
const verifyPassword = async (password, hashedPassword) => {
    return await (0, bcrypt_1.compare)(password, hashedPassword);
};
exports.PasswordCrypto = {
    hashPassword,
    verifyPassword
};
