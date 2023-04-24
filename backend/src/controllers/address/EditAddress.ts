import { Request, Response } from "express"
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup'
import { AddressProviders } from "../../database/providers";
import { validation } from "../../shared/middleware";
import { IEditAddress, MyResponse, NewAddress } from "../../types";
import '../../shared/services/TraducoesYup'

const paramsSchemaValidation: yup.ObjectSchema<Pick<NewAddress, 'cep'>> = yup.object({
    cep: yup.string().required(),
})

const bodySchemaValidation: yup.ObjectSchema<IEditAddress> = yup.object({
    identification: yup.string().required(),
    number: yup.string().required(),
    complement: yup.string(),
    ref: yup.string(),
})

export const editAddressValidation = validation({
    params: paramsSchemaValidation,
    body: bodySchemaValidation
})

export const EditAddress = async (req: Request<Pick<NewAddress, 'cep'>, {}, IEditAddress>, res: Response<{}, MyResponse>) => {

    const { cep } = req.params
    const newAddressInfo = req.body
    const userId = res.locals.userId

    const addressEdited = await AddressProviders.edit(userId, cep, newAddressInfo)

    if (addressEdited instanceof Error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: addressEdited.message
            }
        });

    if (addressEdited === 'Usuário não encontrado')
        return res.status(StatusCodes.NOT_FOUND).json({
            errors: {
                default: addressEdited
            }
        });

    if (addressEdited === 'Usuário não possui esse CEP cadastrado')
        return res.status(StatusCodes.CONFLICT).json({
            errors: {
                default: addressEdited
            }
        });


    return res.status(StatusCodes.OK).json({ addressEdited })
}