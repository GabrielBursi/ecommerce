"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const routes_1 = require("./routes");
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = require("./database");
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use((0, cors_1.default)({
    exposedHeaders: ['x-user-id'],
}));
app.use(express_1.default.json());
app.use(routes_1.router);
(0, database_1.connectToDatabase)()
    .then((data) => {
    if (typeof data === 'string') {
        app.listen(process.env.PORT || 3001);
        console.log('rodando ' + data);
    }
    else {
        console.error(data);
    }
})
    .catch((error) => {
    console.log(error + 'Não conectou ao banco');
});
