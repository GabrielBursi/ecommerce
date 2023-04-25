import { Request, Response } from "express";
import * as yup from "yup";
import { StatusCodes } from "http-status-codes";
import { validation } from "../../shared/middleware";
import { ProductsProviders } from "../../database/providers";
import { IParamProps, MyResponse } from "../../types";

const paramsSchemaValidation: yup.ObjectSchema<IParamProps> = yup.object({
    id: yup.string().required(),
})

export const excludeProductFavoriteValidation = validation({
    params: paramsSchemaValidation
})

export const ExcludeProductFavorite = async (req: Request<IParamProps>, res: Response<{}, MyResponse>) => {
    const { id: productId } = req.params
    const userId = res.locals.userId

    const productDeleted = await ProductsProviders.excludeProductFavorite(userId, productId)

    if (productDeleted instanceof Error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: productDeleted.message
            }
        });
    
    if (productDeleted === 'ID do produto não encontrado' || productDeleted === 'Produto não encontrado nos favoritos.' || productDeleted === 'Usuário não encontrado.')
        return res.status(StatusCodes.NOT_FOUND).json({
            errors: {
                default: productDeleted
            }
        });

    return res.status(StatusCodes.OK).json({ productDeleted })
}