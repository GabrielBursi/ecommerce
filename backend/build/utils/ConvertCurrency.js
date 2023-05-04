"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertCurrency = void 0;
const axios_1 = __importDefault(require("axios"));
async function convertCurrency(products, imposto = 0.1) {
    try {
        const { data } = await (0, axios_1.default)(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY_EXCHANGE_API}/latest/USD`);
        const { conversion_rates } = data;
        const currencyBRL = conversion_rates.BRL;
        for (let product of products) {
            const tax = typeof product.price === 'number' ? product.price * imposto : 0;
            const priceDolar = typeof product.price === 'number' ? product.price : 1;
            const priceReal = priceDolar * currencyBRL;
            product.price = priceReal + tax;
        }
    }
    catch (error) {
        return new Error('Não esta convertido o preço. ' + error);
    }
    return products;
}
exports.convertCurrency = convertCurrency;
