import { Request, Response } from "express"
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup'
import { AddressProviders } from "../../database/providers";
import { validation } from "../../shared/middleware";
import { NewAddress } from "../../types";
import '../../shared/services/TraducoesYup'

const bodySchemaValidation: yup.ObjectSchema<Pick<NewAddress, 'cep'>>   = yup.object({
    cep: yup.string().required(),
})

export const selectAddressValidation = validation({
    body: bodySchemaValidation,
})

export const SelectAddress = async (req: Request<{}, {}, Pick<NewAddress, 'cep'>>, res: Response) => {

    const { cep } = req.body

    const address = await AddressProviders.select('643549a20c776a5adff14835', cep)

    if (address instanceof Error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: address.message
            }
        });

    return res.status(StatusCodes.CREATED).json(address)
}