import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ProductsProviders } from "../../database/providers";
import { MyResponse } from "../../types";

export const ClearCart = async (req: Request, res: Response<{}, MyResponse>) => {

    const userId = res.locals.userId

    const cartDeleted = await ProductsProviders.clear(userId)

    if (cartDeleted instanceof Error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: cartDeleted.message
            }
        });
    
    if (cartDeleted === 'ID do usuário não encontrado' || cartDeleted === 'Usuário não encontrado id')
        return res.status(StatusCodes.NOT_FOUND).json({
            errors: {
                default: cartDeleted
            }
        });

    return res.status(StatusCodes.NO_CONTENT).json({ cartDeleted })
}