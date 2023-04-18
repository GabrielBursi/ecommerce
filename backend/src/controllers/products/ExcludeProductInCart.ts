import { Request, Response } from "express";
import * as yup from "yup";
import { StatusCodes } from "http-status-codes";
import { validation } from "../../shared/middleware";
import { IParamExcludeProps } from "../../types";
import { ProductsProviders } from "../../database/providers";

const paramsSchemaValidation: yup.ObjectSchema<IParamExcludeProps> = yup.object({
    userId: yup.string().required(),
    productId: yup.string().required(),
})

export const excludeProductCartValidation = validation({
    params: paramsSchemaValidation
})

export const ExcludeProductCart = async (req: Request<IParamExcludeProps>, res: Response) => {
    const { userId, productId } = req.params

    const productDeleted = await ProductsProviders.excludeProductCart(userId, productId)

    if (productDeleted instanceof Error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: productDeleted.message
            }
        });

    return res.status(StatusCodes.NO_CONTENT).json({ productDeleted })
}