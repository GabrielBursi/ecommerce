"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.somePrice = void 0;
function somePrice(products, deliveryOption) {
    let total = 0;
    for (const element of products) {
        if (typeof element.price === 'number') {
            total += element.price * element.quant;
        }
        else if (typeof element.price === 'string') {
            total += Number(element.price.replace('R$', '').replace('U$', '').replace(',', '')) * element.quant;
        }
    }
    return total + deliveryOption.price;
}
exports.somePrice = somePrice;
