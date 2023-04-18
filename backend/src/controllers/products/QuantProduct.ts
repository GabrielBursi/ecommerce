import { Request, Response } from "express";
import * as yup from "yup";
import { StatusCodes } from "http-status-codes";
import { validation } from "../../shared/middleware";
import { IParamExcludeProps } from "../../types";
import { ProductsProviders } from "../../database/providers";

export interface BodyValidation {
    action: '+' | '-'
}

const paramsSchemaValidation: yup.ObjectSchema<IParamExcludeProps> = yup.object({
    userId: yup.string().required(),
    productId: yup.string().required(),
})

const bodySchemaValidation = yup.object({
    action: yup.string().required().matches(/^[+-]+$/),
})

export const alterQuantProductValidation = validation({
    params: paramsSchemaValidation,
    body: bodySchemaValidation
})

export const AlterQuantProduct = async (req: Request<IParamExcludeProps, {}, BodyValidation>, res: Response) => {
    const { userId, productId } = req.params
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