import { Locals, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup'

import { IProducts } from "../../types";
import { ProductsProviders } from "../../database/providers";
import '../../shared/services/TraducoesYup'
import { validation } from "../../shared/middleware";

interface Body {
    query: string[],
    page?: number,
    convert?: boolean
}

const bodySchemaValidation: yup.ObjectSchema<Body> = yup.object({
    query: yup.array().required(),
    page: yup.number(),
    convert: yup.boolean()
})

export const createProductValidation = validation({
    body: bodySchemaValidation
})

interface MyResponse extends Locals {
    newProductsWithPriceFormated?: IProducts[]
}

export const AddProduct = async (req: Request, res: Response<{}, MyResponse>) => {

    const productsFormated = res.locals.newProductsWithPriceFormated

    if(!productsFormated){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: 'Erro no processo de formatação do produto.'
            }
        });
    }

    const products = await ProductsProviders.createProduct(productsFormated)

    if (products instanceof Error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: products.message
            }
        });

    return res.status(StatusCodes.OK).json({ products })
}