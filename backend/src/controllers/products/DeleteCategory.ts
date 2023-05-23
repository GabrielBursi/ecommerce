import { Response, Request } from 'express'
import * as yup from 'yup'
import { StatusCodes } from 'http-status-codes'
import { Category } from "../../types"
import { validation } from '../../shared/middleware'
import { ProductsProviders } from '../../database/providers'
import { categories } from '../../utils'

interface Params {
    category?: Category
}

const paramsSchemaValidation: yup.ObjectSchema<Params> = yup.object({
    category: yup.string().oneOf<Category>(categories).required(),
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