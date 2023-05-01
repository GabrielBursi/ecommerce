import { Request, Response, NextFunction, Locals } from 'express';
import { IProducts, IProductsAPI } from '../../../types';

interface MyResponse extends Locals {
    items: IProductsAPI[],
    newProducts: IProducts[],
    convert?: boolean
}

export const formatProducts = (req: Request, res: Response<{}, MyResponse>, next: NextFunction) => {
    const items = res.locals.items;
    const convert = res.locals.convert;

    const newProducts: IProducts[] = [];

    for (const item of items) {
        const { price, reviews, thumbnail, title } = item;
        const { current_price } = price;
        const { rating } = reviews;

        const newProduct: IProducts = {
            img: thumbnail,
            name: title,
            price: current_price,
            quant: 1,
            rating,
            uuid: 'id'
        };

        newProducts.push(newProduct);
    }

    res.locals.newProducts = newProducts;
    res.locals.convert = convert;
    next();
};