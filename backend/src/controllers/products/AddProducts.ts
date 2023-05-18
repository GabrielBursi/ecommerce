import { Locals, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup'

import { IProducts, Category } from "../../types";
import { ProductsProviders } from "../../database/providers";
import '../../shared/services/TraducoesYup'
import { validation } from "../../shared/middleware";

interface Body {
    query: string[],
    category: string,
    page?: number,
    convert?: boolean
}

const arrayCategory = <Category[]>["TV", "cadeira gamer", "casa inteligente", "celular", "câmeras e drones", "espaço gamer", "geek", "hardware", "home", "monitor gamer", "mouse e teclado", "pc gamer", "periféricos", "serviços digitais e softwares", "tablets", "vídeo games", "áudio"]

const bodySchemaValidation: yup.ObjectSchema<Body> = yup.object({
    query: yup.array().required(),
    category: yup.string().oneOf<Category>(arrayCategory).required(),
    page: yup.number(),
    convert: yup.boolean()
})

export const createProductValidation = validation({
    body: bodySchemaValidation
})

interface MyResponse extends Locals {
    newProductsWithPriceFormated?: IProducts[]
}

export const AddProduct = async (req: Request<{}, {}, Body>, res: Response<{}, MyResponse>) => {

    const productsFormated = res.locals.newProductsWithPriceFormated
    const { category } = req.body

    if (!productsFormated) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: 'Erro no processo de formatação do produto.'
            }
        });
    }

    const products = await ProductsProviders.createProduct(productsFormated, category)

    if (products instanceof Error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: products.message
            }
        });

    return res.status(StatusCodes.OK).json({ products })
}