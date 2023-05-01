import { Request, Response, NextFunction, Locals } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IProducts } from '../../../types';
import { convertCurrency, formaProductPrice } from '../../../utils';

interface MyResponse extends Locals {
    newProducts: IProducts[],
    newProductsWithPriceFormated?: IProducts[],
    convert?: boolean
}

export const formatProductPrice = async (req: Request, res: Response<{}, MyResponse>, next: NextFunction) => {
    const newProducts = res.locals.newProducts;
    const convert = res.locals.convert

    const newProductsWithPriceFormated = formaProductPrice(newProducts)
    if(!convert){
        res.locals.newProductsWithPriceFormated = newProductsWithPriceFormated;
    }else{
        const newProductsWithPriceFormatedAndConverted = await convertCurrency(newProductsWithPriceFormated, 0.6)
        if (newProductsWithPriceFormatedAndConverted instanceof Error){
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                errors: {
                    default: newProductsWithPriceFormatedAndConverted.message
                }
            });
        } 
        res.locals.newProductsWithPriceFormated = newProductsWithPriceFormatedAndConverted;
    }
    next();
};