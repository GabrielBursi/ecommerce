import { createContext, useState } from "react";
import { ChildrenProp, IProducts, LimitProductsPerPageString } from "../types";

interface ProductsListContextData {
    calculateMaxAndMinPrice: (products: IProducts[]) => {
        lowest: number;
        highest: number;
    },

    filterPerPage: LimitProductsPerPageString,
    setFilterPerPage: (v: LimitProductsPerPageString) => void,

    priceFilter: number[],
    setPriceFilter: (v: number[]) => void
}

const ProductsListContext = createContext({} as ProductsListContextData)

function ProductsListProvider({ children }: ChildrenProp) {

    const [filterPerPage, setFilterPerPage] = useState<LimitProductsPerPageString>('20 por página');


    const [priceFilter, setPriceFilter] = useState<number[]>([0, 999999]);

    const calculateMaxAndMinPrice = (products: IProducts[]) => {

        const productsFormated = formatPrice(products)
        
        let lowest = productsFormated[0];
        let highest = productsFormated[0];

        for (let i = 1; i < productsFormated.length; i++) {
            if (productsFormated[i].price < lowest.price) {
                lowest = productsFormated[i];
            }

            if (productsFormated[i].price > highest.price) {
                highest = productsFormated[i];
            }
        }
        
        return { lowest: Number(lowest.price), highest: Number(highest.price) };
    };

    const formatPrice = (products: IProducts[]) => {
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

    return (
        <ProductsListContext.Provider value={{
            calculateMaxAndMinPrice,
            filterPerPage,
            priceFilter,
            setFilterPerPage,
            setPriceFilter,
        }}>
            {children}
        </ProductsListContext.Provider>
    );
}

export {
    ProductsListContext,
    ProductsListProvider
}