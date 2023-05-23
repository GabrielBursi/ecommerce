import { Request, Response } from "express"
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup';
import { ProductsProviders } from "../../database/providers"
import { validation } from "../../shared/middleware";
import { IParamProps } from "../../types";
import '../../shared/services/TraducoesYup'

interface Query {
    name?: string
}

const querySchemaValidation: yup.ObjectSchema<Query> = yup.object({
    name: yup.string().required()
})

export const getByNameValidation = validation({
    query: querySchemaValidation
})

export const GetProductByName = async (req: Request<{}, {}, {},Query>, res: Response) => {

    const { name } = req.query

    const products = await ProductsProviders.getByName(name)

    if (products instanceof Error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: products.message
            }
        });

    if (products === 'Informe o nome do produto.' || products === 'Nenhum produto encontrado.')
        return res.status(StatusCodes.NOT_FOUND).json({
            errors: {
                default: products
            }
        });

    return res.status(StatusCodes.OK).json(products)
}