import { createContext, useState } from "react";
import { ChildrenProp, IProducts, LimitProductsPerPage, LimitProductsPerPageString } from "../types";

interface ProductsListContextData {
    calculateMaxAndMinPrice: (products: IProducts[]) => {
        lowestPrice: number;
        highestPrice: number;
    },

    filterPerPage: LimitProductsPerPageString,
    setFilterPerPage: (v: LimitProductsPerPageString) => void,
    limit: LimitProductsPerPage,
    setLimit: (v: LimitProductsPerPage) => void,

    productsList: IProducts[],
    setProductsList: (v: IProducts[]) => void,
    totalCount: number,
    setTotalCount: (v: number) => void,

    highestPrice: number,
    setHighestPrice: (v: number) => void,
    lowestPrice: number,
    setLowestPrice: (v: number) => void,
    priceFilter: number[],
    setPriceFilter: (v: number[]) => void
}

const ProductsListContext = createContext({} as ProductsListContextData)

function ProductsListProvider({ children }: ChildrenProp) {

    const [filterPerPage, setFilterPerPage] = useState<LimitProductsPerPageString>('20 por página');
    const [limit, setLimit] = useState<LimitProductsPerPage>(20);

    const [productsList, setProductsList] = useState<IProducts[]>([]);
    const [totalCount, setTotalCount] = useState(0);

    const [highestPrice, setHighestPrice] = useState(999999);
    const [lowestPrice, setLowestPrice] = useState(0);
    const [priceFilter, setPriceFilter] = useState<number[]>([lowestPrice, highestPrice]);

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

        setLowestPrice(lowestPrice)
        setHighestPrice(highestPrice)
        setPriceFilter([lowestPrice, highestPrice])

        return { lowestPrice, highestPrice };
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
            highestPrice,
            limit,
            lowestPrice,
            priceFilter,
            productsList,
            setFilterPerPage,
            setHighestPrice,
            setLimit,
            setLowestPrice,
            setPriceFilter,
            setProductsList,
            setTotalCount,
            totalCount,
        }}>
            {children}
        </ProductsListContext.Provider>
    );
}

export {
    ProductsListContext,
    ProductsListProvider
}