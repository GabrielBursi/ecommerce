import { Request, Response } from "express"
import * as yup from 'yup'
import { StatusCodes } from "http-status-codes"
import { validation } from "../../shared/middleware"
import { IParamProps, MyResponse } from "../../types"
import { ProductsProviders } from "../../database/providers"
import '../../shared/services/TraducoesYup'

const paramsSchemaValidation: yup.ObjectSchema<IParamProps> = yup.object({
    id: yup.string().required()
})

export const addProductInFavoriteValidation = validation({
    params: paramsSchemaValidation
})

export const AddFavorite = async (req: Request<IParamProps>, res: Response<{}, MyResponse>) => {

    const productId = req.params.id
    const userId = res.locals.userId

    const favorites = await ProductsProviders.addInFavorite(userId, productId)

    if (favorites instanceof Error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: favorites.message
            }
        });
    
    if (favorites === 'ID do produto não encontrado' || favorites === 'Produto não encontrado id' || favorites === 'Usuário não encontrado id')
        return res.status(StatusCodes.NOT_FOUND).json({
            errors: {
                default: favorites
            }
        });

    if (favorites === 'Produto já está nos favoritos')
        return res.status(StatusCodes.CONFLICT).json({
            errors: {
                default: favorites
            }
        });

    return res.status(StatusCodes.OK).json({ favorites })
}