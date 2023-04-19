import { Request, Response } from "express"
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup';

import { MyResponse, NewAddress } from "../../types"
import { AddressProviders } from "../../database/providers";
import { validation } from "../../shared/middleware";
import '../../shared/services/TraducoesYup'

export const bodyAddressSchemaValidation: yup.ObjectSchema<Omit<NewAddress, 'isSelected'>> = yup.object({
    cep: yup.string().required(),
    identification: yup.string().required(),
    street: yup.string().required(),
    number: yup.string().required(),
    complement: yup.string(),
    ref: yup.string(),
    neighborhood: yup.string().required(),
    city: yup.string(),
    state: yup.string(),
})

export const createAddressValidation = validation({
    body: bodyAddressSchemaValidation,
})

export const CreateNewAddress = async (req: Request<{}, {}, NewAddress>, res: Response<{}, MyResponse>) => {

    const userId = res.locals.userId
    const newAddress = req.body

    const address = await AddressProviders.create(userId, newAddress)

    if (address instanceof Error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: address.message
            }
        });

    return res.status(StatusCodes.CREATED).json({address})
}