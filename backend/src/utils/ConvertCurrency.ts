import axios from 'axios';
import { IProducts } from '../types';

export async function convertCurrency(products: IProducts[], imposto: number = 0.1) {
    try {
        const { data } = await axios(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY_EXCHANGE_API}/latest/USD`);
        const { conversion_rates } = data
        const currencyBRL: number = conversion_rates.BRL;
    
        for (let product of products) {

            const tax = typeof product.price === 'number' ? product.price * imposto : 0;

            const priceDolar = typeof product.price === 'number' ? product.price : 1;
            const priceReal = priceDolar * currencyBRL;
            product.price = priceReal + tax;
            product.price = product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
        }
    } catch (error) {
        return new Error('Não esta convertido o preço. ' + error)
    }
    return products;
}