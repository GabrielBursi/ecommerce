import { Request, Response } from "express"
import * as yup from 'yup'
import { StatusCodes } from "http-status-codes"
import { ProductsProviders } from "../../database/providers"
import { validation } from "../../shared/middleware"
import { IParamProps, MyResponse } from "../../types"
import '../../shared/services/TraducoesYup'

const paramsSchemaValidation: yup.ObjectSchema<IParamProps> = yup.object({
    id: yup.string().required()
})

export const addProductInCartValidation = validation({
    params: paramsSchemaValidation
})

export const AddCart = async (req: Request<IParamProps>, res: Response<{}, MyResponse>) => {

    const productId = req.params.id
    const userId = res.locals.userId

    const products = await ProductsProviders.addInCart(userId, productId)

    if (products instanceof Error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: products
            }
        });

    if (products === 'ID do produto não encontrado' || products === 'Produto não encontrado id' || products === 'Usuário não encontrado id')
        return res.status(StatusCodes.NOT_FOUND).json({
            errors: {
                default: products
            }
        });
    
    return res.status(StatusCodes.OK).json({ products })
}