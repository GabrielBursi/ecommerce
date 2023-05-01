import { Request, Response } from "express"
import * as yup from 'yup';
import { StatusCodes } from "http-status-codes";

import { MyOrdersSchema } from "../../database/models";
import { validation } from "../../shared/middleware"
import { bodyAddressSchemaValidation } from "../address/CreateNewAddress";
import { ProductsProviders } from "../../database/providers";

import '../../shared/services/TraducoesYup'
import { MyResponse } from "../../types";

const bodySchemaValidation: yup.ObjectSchema<Omit<MyOrdersSchema, 'products' | 'total'>> = yup.object({
    info: yup.object({
        number: yup.string().required(),
        status: yup.boolean().default(true).required(),
        date: yup.string().required(),
        payment: yup.string().required(),
    }).required(),
    address: bodyAddressSchemaValidation,
})

export const createMyOrderValidation = validation({
    body: bodySchemaValidation,
})

export const Purchase = async (req: Request<{}, {}, Omit<MyOrdersSchema, 'products' | 'total'>>, res: Response<{}, MyResponse>) => {

    const order = req.body
    const userId = res.locals.userId

    const myOrders = await ProductsProviders.createMyOrder(userId, order)

    if (myOrders instanceof Error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: myOrders.message
            }
        });
    
    if (myOrders === 'O carrinho está vazio.' || myOrders === 'O numero de pedido já existe.')
        return res.status(StatusCodes.CONFLICT).json({
            errors: {
                default: myOrders
            }
        });

    if (myOrders === 'Usuário não encontrado id')
        return res.status(StatusCodes.NOT_FOUND).json({
            errors: {
                default: myOrders
            }
        });

    return res.status(StatusCodes.OK).json({ myOrders })
}