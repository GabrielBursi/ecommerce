import axios from 'axios';
import { IProducts } from '../../types/api/Products';

export async function convertCurrency(products: IProducts[]) {
    try {
        const { data } = await axios(`https://v6.exchangerate-api.com/v6/${process.env.REACT_APP_API_KEY_EXCHANGE_API}/latest/USD`);
        const { conversion_rates } = data
        const currencyBRL: number = conversion_rates.BRL;
    
        for (let product of products) {
            const priceDolar = typeof product.price === 'number' ? product.price : 1;
            const priceReal = priceDolar * currencyBRL;
            product.price = priceReal;
        }
    } catch (error) {
        alert('Não esta convertido o preço. ' + error)
    }
    return products;
}