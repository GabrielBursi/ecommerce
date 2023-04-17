import { Request, Response } from "express"
import * as yup from 'yup'
import { StatusCodes } from "http-status-codes"
import { ProductsProviders } from "../../database/providers"
import { validation } from "../../shared/middleware"
import { IParamProps } from "../../types"
import '../../shared/services/TraducoesYup'

const paramsSchemaValidation: yup.ObjectSchema<IParamProps> = yup.object({
    id: yup.string().required()
})

export const addProductInCartValidation = validation({
    params: paramsSchemaValidation
})

export const AddCart = async (req: Request<IParamProps>, res: Response) => {

    const productId = req.params.id

    const products = await ProductsProviders.addInCart(process.env.USER_ID || '', productId || '')

    if (products instanceof Error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: products.message
            }
        });
    
    return res.status(StatusCodes.OK).json({ products })
}