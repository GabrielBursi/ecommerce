"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchId = void 0;
const http_status_codes_1 = require("http-status-codes");
const searchId = (req, res, next) => {
    const userId = req.headers["x-user-id"];
    if (!userId) {
        return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
            errors: {
                default: 'ID do usuario não encontrado: ' + userId,
            },
        });
    }
    res.locals.userId = userId;
    return next();
};
exports.searchId = searchId;
