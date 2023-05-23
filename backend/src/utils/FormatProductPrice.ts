import { IProducts } from "../types";

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

export function assignRandomPrice(products: IProducts[]) {
    for (const element of products) {
        const product = element;

        const randomPrice = Math.random() * 10000; // Gera um valor aleatório entre 0 e 100
        product.price = randomPrice.toFixed(2); // Atribui o valor aleatório com duas casas decimais
    }

    return products
}