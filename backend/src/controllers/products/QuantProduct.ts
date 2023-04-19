import { Request, Response } from "express";
import * as yup from "yup";
import { StatusCodes } from "http-status-codes";
import { validation } from "../../shared/middleware";
import { IParamProps, MyResponse } from "../../types";
import { ProductsProviders } from "../../database/providers";

export interface BodyValidation {
    action: '+' | '-'
}

const bodySchemaValidation = yup.object({
    action: yup.string().required().matches(/^[+-]+$/),
})

const paramsSchemaValidation: yup.ObjectSchema<IParamProps> = yup.object({
    id: yup.string().required(),
})

export const excludeProductCartValidation = validation({
    params: paramsSchemaValidation,
    body: bodySchemaValidation
})

export const AlterQuantProduct = async (req: Request<IParamProps, {}, BodyValidation>, res: Response<{}, MyResponse>) => {
    const { id: productId } = req.params
    const userId = res.locals.userId
    const { action } = req.body

    const productAltered = await ProductsProviders.alterQuant(userId, productId, action)

    if (productAltered instanceof Error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: productAltered.message
            }
        });

    return res.status(StatusCodes.OK).json({ productAltered })
}