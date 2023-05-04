"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Api = void 0;
const axios_1 = __importDefault(require("axios"));
async function Api(item, page = 1) {
    const options = {
        method: 'GET',
        url: process.env.RAPID_API_URL,
        params: {
            query: item,
            page: page,
            country: 'BR'
        },
        headers: {
            'X-RapidAPI-Key': process.env.RAPID_API_KEY,
            'X-RapidAPI-Host': process.env.RAPID_API_HOST
        }
    };
    try {
        const res = await (0, axios_1.default)(options);
        const { data } = res;
        const { result } = data;
        return result;
    }
    catch (error) {
        return new Error('Erro' + error);
    }
}
exports.Api = Api;
