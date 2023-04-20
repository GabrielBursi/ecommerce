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

    if (productAltered === 'Produto com uma quantidade.')
        return res.status(StatusCodes.CONFLICT).json({
            errors: {
                default: productAltered
            }
        });

    if (productAltered === 'ID do produto não encontrado' || productAltered === 'Produto não encontrado no carrinho.' || productAltered === 'Usuário não encontrado.')
        return res.status(StatusCodes.NOT_FOUND).json({
            errors: {
                default: productAltered
            }
        });

    return res.status(StatusCodes.OK).json({ productAltered })
}