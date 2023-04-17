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

    const favorites = await ProductsProviders.addInFavorite(process.env.USER_ID || '', productId || '')

    if (favorites instanceof Error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: favorites.message
            }
        });

    return res.status(StatusCodes.OK).json({ favorites })
}