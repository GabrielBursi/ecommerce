import { Request, Response } from "express"
import { StatusCodes } from "http-status-codes";
import { DeliveryProviders } from "../../database/providers";
import '../../shared/services/TraducoesYup'
import { MyResponse } from "../../types";

export const GetAllDeliveryOptions = async (req: Request, res: Response<{}, MyResponse>) => {

    const userId = res.locals.userId

    const deliveryOptions = await DeliveryProviders.getAll(userId)

    if (deliveryOptions instanceof Error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: deliveryOptions.message
            }
        });

    if (deliveryOptions === 'Usuário não encontrado.')
        return res.status(StatusCodes.NOT_FOUND).json({
            errors: {
                default: deliveryOptions
            }
        });

    return res.status(StatusCodes.OK).json({ deliveryOptions })
}