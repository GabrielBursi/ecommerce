"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatProducts = void 0;
const formatProducts = (req, res, next) => {
    const items = res.locals.items;
    const convert = res.locals.convert;
    const newProducts = [];
    for (const item of items) {
        const { price, reviews, thumbnail, title } = item;
        const { current_price } = price;
        const { rating } = reviews;
        const newProduct = {
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
exports.formatProducts = formatProducts;
