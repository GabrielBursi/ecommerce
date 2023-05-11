import { Request, Response } from "express"
import { StatusCodes } from "http-status-codes";
import { ProductsProviders } from "../../database/providers";
import '../../shared/services/TraducoesYup'

export const GetHomeProducts = async (req: Request, res: Response) => {
    const products = await ProductsProviders.getHome()

    if (products instanceof Error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: products.message
            }
        });
    
    return res.status(StatusCodes.OK).json({ products })
}