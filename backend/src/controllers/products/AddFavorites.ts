import { Request, Response } from "express"
import * as yup from 'yup'
import { StatusCodes } from "http-status-codes"
import { validation } from "../../shared/middleware"
import { IParamProps } from "../../types"
import { ProductsProviders } from "../../database/providers"
import '../../shared/services/TraducoesYup'

const paramsSchemaValidation: yup.ObjectSchema<IParamProps> = yup.object({
    id: yup.string().required()
})

export const addProductInFavoriteValidation = validation({
    params: paramsSchemaValidation
})

export const AddFavorite = async (req: Request<IParamProps>, res: Response) => {

    const productId = req.params.id

    const productInFavorite = await ProductsProviders.addInFavorite('643549a20c776a5adff14835', productId || '')

    if (productInFavorite instanceof Error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: productInFavorite.message
            }
        });

    return res.status(StatusCodes.OK).json({ productInFavorite })
}