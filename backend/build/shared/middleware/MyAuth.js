"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.myAuth = void 0;
const http_status_codes_1 = require("http-status-codes");
const myAuth = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({ errors: { default: 'Não autorizado.' } });
    }
    const [type, token] = authorization.split(' ');
    if (type !== 'Bearer') {
        return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({ errors: { default: 'Não autorizado.' } });
    }
    if (token !== process.env.JWT_SECRET) {
        return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({ errors: { default: 'Não autorizado.' } });
    }
    return next();
};
exports.myAuth = myAuth;
