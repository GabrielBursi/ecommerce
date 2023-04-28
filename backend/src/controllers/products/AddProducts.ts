import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { IProducts } from "../../types";
import { ProductsProviders } from "../../database/providers";
import '../../shared/services/TraducoesYup'
import { convertCurrency, formaProductPrice } from "../../utils";

export const AddProduct = async (req: Request<{}, {}, IProducts[]>, res: Response) => {

    const newProducts = req.body

    const newProductsWithPriceFormated = formaProductPrice(newProducts)
    const newProductsWithPriceFormatedAndConverted = await convertCurrency(newProductsWithPriceFormated, 0.6)

    if (newProductsWithPriceFormatedAndConverted instanceof Error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: newProductsWithPriceFormatedAndConverted.message
            }
        });

    const products = await ProductsProviders.createProduct(newProductsWithPriceFormatedAndConverted)

    if (products instanceof Error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: products.message
            }
        });

    return res.status(StatusCodes.OK).json({ products })
}