import { Request, Response } from "express"
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup'
import { validation } from "../../shared/middleware";
import { IDelivery, MyResponse } from "../../types";
import '../../shared/services/TraducoesYup'
import { DeliveryProviders } from "../../database/providers";

const bodySchemaValidation: yup.ObjectSchema<Pick<IDelivery, 'name'>> = yup.object({
    name: yup.string().required(),
})

export const selectDeliveryValidation = validation({
    body: bodySchemaValidation,
})

export const SelectDeliveryOption = async (req: Request<{}, {}, Pick<IDelivery, 'name'>>, res: Response<{}, MyResponse>) => {

    const { name } = req.body
    const userId = res.locals.userId

    const deliveryOptionSelected = await DeliveryProviders.select(userId, name)

    if (deliveryOptionSelected instanceof Error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: deliveryOptionSelected.message
            }
        });

    if (deliveryOptionSelected === 'Usuário não encontrado')
        return res.status(StatusCodes.NOT_FOUND).json({
            errors: {
                default: deliveryOptionSelected
            }
        });

    if (deliveryOptionSelected === 'Opção de entrega não encontrada.')
        return res.status(StatusCodes.CONFLICT).json({
            errors: {
                default: deliveryOptionSelected
            }
        });


    return res.status(StatusCodes.OK).json({ deliveryOptionSelected })
}