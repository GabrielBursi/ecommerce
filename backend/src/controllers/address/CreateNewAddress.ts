import { Request, Response } from "express"
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup';

import { NewAddress } from "../../types"
import { AddressProviders } from "../../database/providers";
import { validation } from "../../shared/middleware";
import '../../shared/services/TraducoesYup'

const bodySchemaValidation: yup.ObjectSchema<Omit<NewAddress, 'isSelected'>> = yup.object({
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
    body: bodySchemaValidation,
})

export const CreateNewAddress = async (req: Request<{}, {}, NewAddress>, res: Response) => {

    const address = await AddressProviders.createAddress('643549a20c776a5adff14835', req.body)

    if (address instanceof Error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: address.message
            }
        });

    return res.status(StatusCodes.CREATED).json(address)
}