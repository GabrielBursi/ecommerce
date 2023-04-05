import { IProducts } from "../../types";

export function formaProductPrice(products: IProducts[]){
    const arrayWithProductPriceNumber: IProducts[] = products.map(product => {
        if (typeof product.price === 'string') {
            return {
                ...product,
                price: Number(product.price.replace('R$', '').replace('$', '').replace(',', ''))
            }
        }
        return product;
    })

    return arrayWithProductPriceNumber
}