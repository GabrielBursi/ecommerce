"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formaProductPrice = void 0;
function formaProductPrice(products) {
    const arrayWithProductPriceNumber = products.map(product => {
        if (typeof product.price === 'string') {
            return {
                ...product,
                price: Number(product.price.replace('R$', '').replace('$', '').replace(',', ''))
            };
        }
        return product;
    });
    return arrayWithProductPriceNumber;
}
exports.formaProductPrice = formaProductPrice;
