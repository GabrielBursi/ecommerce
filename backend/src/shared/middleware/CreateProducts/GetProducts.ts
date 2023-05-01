import { Request, Response, NextFunction, Locals } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IProductsAPI } from '../../../types';
import { Api } from '../../services';
import { ProductsProviders } from '../../../database/providers';
import { arrayTESTE } from '../../../utils';

interface Body {
    page?: number, 
    query: string[],
    convert?: boolean
}

interface MyResponse extends Locals {
    items: IProductsAPI[],
    convert?: boolean
}

export const fetchProducts = async (req: Request<{}, {}, Body>, res: Response<{}, MyResponse>, next: NextFunction) => {
    const { page, query, convert = false } = req.body;

    const items: IProductsAPI[] = [];

    try {
        for (const queryItem of query) {
            const productsApi = await Api(queryItem, page);

            if (productsApi instanceof Error) {
                const products = await ProductsProviders.createProduct(arrayTESTE)
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                    errors: {
                        default: productsApi.message
                    },
                    products
                });
            }

            if (productsApi[0].title.startsWith('Anúncio patrocinado')){
                continue 
            }

            items.push(productsApi[0]);
        }

        res.locals.items = items;
        res.locals.convert = convert;
        next();
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: 'Failed to fetch products'
            }
        });
    }
};