import { NextFunction, Request, Response } from "express"
import { StatusCodes } from "http-status-codes"
import { MyResponse } from "../../types";

export const searchId = (req: Request, res: Response<{}, MyResponse>, next: NextFunction) => {
    const userId = req.headers["x-user-id"];
    if (!userId) {
        return res.status(StatusCodes.NOT_FOUND).json({
            errors: {
                default: 'ID do usuario não encontrado: ' + userId,
            },
        });
    }
    
    res.locals.userId = userId as string;

    return next()
}