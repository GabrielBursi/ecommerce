import { Request, Response } from "express"
import * as yup from 'yup';
import { StatusCodes } from "http-status-codes";

import { MyOrdersSchema } from "../../database/models";
import { validation } from "../../shared/middleware"
import { bodyAddressSchemaValidation } from "../address/CreateNewAddress";
import { ProductsProviders } from "../../database/providers";

import '../../shared/services/TraducoesYup'

const bodySchemaValidation: yup.ObjectSchema<Omit<MyOrdersSchema, 'userId'>> = yup.object({
    products: yup.array().required(),
    number: yup.string().required(),
    status: yup.boolean().default(true).required(),
    date: yup.string().required(),
    payment: yup.string().required(),
    address: bodyAddressSchemaValidation,
})

export const createMyOrderValidation = validation({
    body: bodySchemaValidation,
})

export const Purchase = async (req: Request<{}, {}, MyOrdersSchema>, res: Response) => {

    const order = req.body

    const myOrder = await ProductsProviders.createMyOrder('6436ad8cff997f78476ca08d', order)

    if (myOrder instanceof Error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: myOrder.message
            }
        });

    return res.status(StatusCodes.OK).json({ myOrder })
}