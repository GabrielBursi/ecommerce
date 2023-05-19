import { Request, Response } from "express"
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup'

import { ProductsProviders } from "../../database/providers";
import '../../shared/services/TraducoesYup'
import { IFilterProducts } from "../../types";
import { validation } from "../../shared/middleware";

interface Params {
    category?: string
}

interface Query {
    page?: string,
    min?: string,
    max?: string,
    limit?: string
}

const paramsSchemaValidation: yup.ObjectSchema<Params> = yup.object({
    category: yup.string().required()
})

const querySchemaValidation: yup.ObjectSchema<Query> = yup.object({
    page: yup.string().required(),
    min: yup.string().required(),
    max: yup.string().required(),
    limit: yup.string().required().matches(/^(20|40|60|80|100)$/),
})

export const filterProductValidation = validation({
    params: paramsSchemaValidation,
    query: querySchemaValidation
})

export const GetProductsByCategory = async (req: Request<Params, {}, {}, Query>, res: Response) => {

    const { category } = req.params
    const { page = '1', min = '1', max = '9999999', limit = '20' } = req.query

    const nPage = Number(page)
    const nMin = Number(min)
    const nMax = Number(max)
    const nExibir = Number(limit)
    

    const skip = (nPage - 1) * nExibir

    const filter: IFilterProducts = {
        skip,
        limit: nExibir,
        price: {
            min: nMin,
            max: nMax
        }
    }

    const products = await ProductsProviders.getByCategory(category || '', filter)

    if (products instanceof Error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: products.message
            }
        });

    return res.status(StatusCodes.OK).json(products)
}