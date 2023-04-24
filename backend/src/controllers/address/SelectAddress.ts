import { Request, Response } from "express"
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup'
import { AddressProviders } from "../../database/providers";
import { validation } from "../../shared/middleware";
import { MyResponse, NewAddress } from "../../types";
import '../../shared/services/TraducoesYup'

const bodySchemaValidation: yup.ObjectSchema<Pick<NewAddress, 'cep'>>   = yup.object({
    cep: yup.string().required(),
})

export const selectAddressValidation = validation({
    body: bodySchemaValidation,
})

export const SelectAddress = async (req: Request<{}, {}, Pick<NewAddress, 'cep'>>, res: Response<{}, MyResponse>) => {

    const { cep } = req.body
    const userId = res.locals.userId

    const addressSelected = await AddressProviders.select(userId, cep)

    if (addressSelected instanceof Error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: addressSelected.message
            }
        });

    if (addressSelected === 'Usuário não encontrado')
        return res.status(StatusCodes.NOT_FOUND).json({
            errors: {
                default: addressSelected
            }
        });

    if (addressSelected === 'Usuário não possui esse CEP cadastrado')
        return res.status(StatusCodes.CONFLICT).json({
            errors: {
                default: addressSelected
            }
        });


    return res.status(StatusCodes.OK).json({addressSelected})
}