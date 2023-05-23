import { Request, Response, NextFunction, Locals } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IProductsAPI } from '../../../types';
import { Api } from '../../services';
import { ProductsProviders } from '../../../database/providers';
import { arrayTESTE, assignRandomPrice } from '../../../utils';

interface Body {
    page?: number, 
    query: string[],
    convert?: boolean,
    category: string
}

interface MyResponse extends Locals {
    items: IProductsAPI[],
    convert?: boolean
}

export const fetchProducts = async (req: Request<{}, {}, Body>, res: Response<{}, MyResponse>, next: NextFunction) => {
    const { page, query, convert = false, category } = req.body;

    const items: IProductsAPI[] = []; //* array começa vazio

    try {
        for (const queryItem of query) {
            const productsApi = await Api(queryItem, page); //* retorna um array de produtos da API da Amazon para cada item da query

            if (productsApi instanceof Error) { //? se a API da Amazon estiver fora, vai ser usado um Array De Teste
                const products = await ProductsProviders.createProduct(assignRandomPrice(arrayTESTE), category)
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

            items.push(productsApi[0]); //* adiciona o primeiro item do array retornado pela API no array de item
        }

        res.locals.items = items; //! array com cada primeiro elemento retornado pela API da Amazon
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