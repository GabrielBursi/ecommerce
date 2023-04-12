import { Request, Response } from "express"
import { StatusCodes } from "http-status-codes";
import { ProductsProviders } from "../../database/providers";
import '../../shared/services/TraducoesYup'

export const GetAllProducts = async (req: Request, res: Response) => {
    const products = await ProductsProviders.getAll()

    if (products instanceof Error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: 'Erro ao consultar registros'
            }
        });
    
    return res.status(StatusCodes.OK).json({ products })
}