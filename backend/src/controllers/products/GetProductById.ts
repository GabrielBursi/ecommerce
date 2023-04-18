import { Request, Response } from "express"
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup';
import { ProductsProviders } from "../../database/providers"
import { validation } from "../../shared/middleware";
import { IParamProps } from "../../types";
import '../../shared/services/TraducoesYup'

const paramsSchemaValidation: yup.ObjectSchema<IParamProps> = yup.object({
    id: yup.string().required()
})

export const getByIdValidation = validation({
    params: paramsSchemaValidation
})

export const GetProductById = async (req: Request<IParamProps>, res: Response) => {

    const { id } = req.params

    const product = await ProductsProviders.getById(id)

    if (product instanceof Error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: product.message
            }
        });
    
    return res.status(StatusCodes.OK).json({ product })
}