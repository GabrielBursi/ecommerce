import { Request, Response } from "express";
import * as yup from "yup";
import { StatusCodes } from "http-status-codes";
import { ProductsProviders } from "../../database/providers";
import { validation } from "../../shared/middleware";
import { IParamProps } from "../../types";

const paramsSchemaValidation: yup.ObjectSchema<IParamProps> = yup.object({
    id: yup.string().required()
})

export const excludeProductFavoriteValidation = validation({
    params: paramsSchemaValidation
})

export const ClearCart = async (req: Request<IParamProps>, res: Response) => {

    const userId = req.params.id

    const cartDeleted = await ProductsProviders.clear(userId)

    if (cartDeleted instanceof Error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: cartDeleted.message
            }
        });

    return res.status(StatusCodes.NO_CONTENT).json({ cartDeleted })
}