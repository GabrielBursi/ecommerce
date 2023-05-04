"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureAuthenticated = void 0;
const http_status_codes_1 = require("http-status-codes");
const services_1 = require("../services");
const ensureAuthenticated = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({ errors: { default: 'Não autorizado.' } });
    }
    const [type, token] = authorization.split(' ');
    if (type !== 'Bearer') {
        return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({ errors: { default: 'Não autorizado.' } });
    }
    const jwtData = services_1.JWTService.verify(token);
    if (jwtData === 'JWT_NOT_FOUND') {
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ errors: { default: 'Não foi possível gerar o token.' } });
    }
    else if (jwtData === 'INVALID_TOKEN') {
        return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({ errors: { default: 'Não autorizado.' } });
    }
    req.headers.idUser = jwtData.uid.toString();
    return next();
};
exports.ensureAuthenticated = ensureAuthenticated;
