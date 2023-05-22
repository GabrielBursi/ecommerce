import { Response, Request } from 'express'
import * as yup from 'yup'
import { StatusCodes } from 'http-status-codes'
import { Category } from "../../types"
import { validation } from '../../shared/middleware'
import { ProductsProviders } from '../../database/providers'

interface Params {
    category?: Category
}

const arrayCategory = <Category[]>["TV", "cadeira gamer", "casa inteligente", "celular", "câmeras e drones", "espaço gamer", "geek", "hardware", "home", "monitor gamer", "mouse e teclado", "pc gamer", "periféricos", "serviços digitais e softwares", "tablets", "vídeo games", "áudio"]

const paramsSchemaValidation: yup.ObjectSchema<Params> = yup.object({
    category: yup.string().oneOf<Category>(arrayCategory).required(),
})

export const deleteCategoryValidation = validation({
    params: paramsSchemaValidation
})

export const DeleteCategory = async (req: Request<Params>, res: Response) => {

    const category = req.params.category

    const categoryDeleted = await ProductsProviders.deleteCategory(category)

    if (categoryDeleted instanceof Error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: categoryDeleted.message
            }
        });

    if (categoryDeleted === 'category do produto não encontrado'){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: categoryDeleted
            }
        });
    }

    return res.status(StatusCodes.OK).json({ categoryDeleted })
}