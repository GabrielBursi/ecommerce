"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
async function connectToDatabase() {
    try {
        await mongoose_1.default.connect(process.env.DB_URI || '');
        return 'Successfully connected to MongoDB Atlas';
    }
    catch (error) {
        return new Error(`Error connecting to MongoDB Atlas: ${error}`);
    }
}
exports.connectToDatabase = connectToDatabase;
