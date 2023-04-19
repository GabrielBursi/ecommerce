import { Request, Response } from "express";
import * as yup from "yup";
import { StatusCodes } from "http-status-codes";
import { validation } from "../../shared/middleware";
import { IParamProps, MyResponse } from "../../types";
import { ProductsProviders } from "../../database/providers";

const paramsSchemaValidation: yup.ObjectSchema<IParamProps> = yup.object({
    id: yup.string().required(),
})

export const excludeProductCartValidation = validation({
    params: paramsSchemaValidation
})

export const ExcludeProductCart = async (req: Request<IParamProps>, res: Response<{}, MyResponse>) => {
    const { id: productId } = req.params
    const userId = res.locals.userId

    const productDeleted = await ProductsProviders.excludeProductCart(userId, productId)

    if (productDeleted instanceof Error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: productDeleted.message
            }
        });

    return res.status(StatusCodes.NO_CONTENT).json({ productDeleted })
}