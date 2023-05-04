"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const users_1 = require("./users");
const address_1 = require("./address");
const products_1 = require("./products");
const delivery_1 = require("./delivery");
exports.router = express_1.default.Router({ mergeParams: true });
exports.router.get('/', (_, res) => { res.send('Hello World!'); });
exports.router.use('/', users_1.routerUser);
exports.router.use('/', address_1.routerAddress);
exports.router.use('/', products_1.routerProducts);
exports.router.use('/', delivery_1.routerDelivery);
