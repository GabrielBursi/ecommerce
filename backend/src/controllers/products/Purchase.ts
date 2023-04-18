import { Request, Response } from "express"
import * as yup from 'yup';
import { StatusCodes } from "http-status-codes";

import { MyOrdersSchema } from "../../database/models";
import { validation } from "../../shared/middleware"
import { bodyAddressSchemaValidation } from "../address/CreateNewAddress";
import { ProductsProviders } from "../../database/providers";

import '../../shared/services/TraducoesYup'
import { MyResponse } from "../../types";

const bodySchemaValidation: yup.ObjectSchema<Omit<MyOrdersSchema, 'products'>> = yup.object({
    number: yup.string().required(),
    status: yup.boolean().default(true).required(),
    date: yup.string().required(),
    payment: yup.string().required(),
    address: bodyAddressSchemaValidation,
})

export const createMyOrderValidation = validation({
    body: bodySchemaValidation,
})

export const Purchase = async (req: Request<{}, {}, Omit<MyOrdersSchema, 'products'>>, res: Response<{}, MyResponse>) => {

    const order = req.body
    const userId = res.locals.userId

    const myOrders = await ProductsProviders.createMyOrder(userId, order)

    if (myOrders instanceof Error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: myOrders.message
            }
        });

    return res.status(StatusCodes.OK).json({ myOrders })
}