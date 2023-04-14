import { Request, Response } from "express";
import * as yup from 'yup';
import { StatusCodes } from "http-status-codes";

import { validation } from "../../shared/middleware"
import { IProducts } from "../../types";
import { ProductsProviders } from "../../database/providers";
import '../../shared/services/TraducoesYup'

const bodySchemaValidation: yup.ObjectSchema<Omit<IProducts, 'uuid' | 'description'>> = yup.object({
    name: yup.string().required(),
    img: yup.string().required(),
    price: yup.string().required(),
    rating: yup.number().required(),
    quant: yup.number().required(),
})

export const createProductValidation = validation({
    body: bodySchemaValidation,
})

export const AddProduct = async (req: Request<{}, {}, IProducts>, res: Response) => {

    const product = req.body

    const newProduct = await ProductsProviders.createProduct(product)

    if (newProduct instanceof Error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: newProduct.message
            }
        });

    return res.status(StatusCodes.OK).json({ newProduct })
}