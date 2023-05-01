import { Request, Response, NextFunction, Locals } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IProductsAPI } from '../../../types';
import { Api } from '../../services';

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
                console.log(productsApi.message);
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                    errors: {
                        default: productsApi.message
                    }
                });
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