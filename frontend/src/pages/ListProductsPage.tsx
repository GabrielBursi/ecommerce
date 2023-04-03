import { useCallback, useContext, useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Box, CircularProgress, Divider, Pagination } from "@mui/material";
import { LoginContext } from "../contexts";
import { LayoutBase } from "../layouts";
import { Filter, ProductList } from "../components";
import { IProducts } from "../types";
import { getAllProducts } from "../services";

export function ListProductsPage() {
    const { isLogged } = useContext(LoginContext)

    const [filterPage, setFilterPage] = useState('20 por página');
    const [filterNumberPerPage, setFilterNumberPerPage] = useState(Number(filterPage.split(' ')[0]));
    const [productsList, setProductList] = useState<IProducts[]>([]);
    const [totalCount, setTotalCount] = useState(0);
    const [highestPrice, setHighestPrice] = useState(1);
    const [lowestPrice, setLowestPrice] = useState(0);
    const [priceFilter, setPriceFilter] = useState<number[]>([lowestPrice, highestPrice]);
    const [isLoading, setIsLoading] = useState(false);

    const { product: category } = useParams<'product'>()
    const [searchParams, setSearchParams] = useSearchParams()
    const page = searchParams.get('page') || '1'

    useEffect(() => {
        getFilterProduct();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterNumberPerPage, page, category]);

    useEffect(() => {
        setFilterPage('20 por página')
        setFilterNumberPerPage(20)
    }, [category]);

    const getFilterProduct = useCallback(async (lower?: number, higher?: number) => {
        setIsLoading(true);
        try {
            const products = await getAllProducts(false, true, undefined, filterNumberPerPage as 20 | 40 | 60 | 80 | 100, page, lower, higher);
            if (typeof products === 'object' && 'data' in products && 'totalCount' in products) {
                setProductList(products.data);
                setTotalCount(products.totalCount);
                if(!lower && !higher){
                    calculeHighestPriceAndLowestPriceThanSet(products.data)
                }
            }
        } catch (error) {
            console.error(error);
        }
        setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterNumberPerPage, page]);

    const handleSliderEnd = useCallback((_: React.SyntheticEvent) => {
        setTimeout(async () => {
            getFilterProduct(priceFilter[0], priceFilter[1])
        }, 2000); 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [priceFilter])

    const calculeHighestPriceAndLowestPriceThanSet = useCallback((products: IProducts[]) => {
        if(products.length > 0){
            const menorValor = products.reduce((anterior, atual) => anterior.price < atual.price ? anterior : atual);
            const maiorValor = products.reduce((anterior, atual) => anterior.price > atual.price ? anterior : atual);
    
            if (typeof menorValor.price === 'number' && typeof maiorValor.price === 'number') {
                setHighestPrice(maiorValor.price)
                setLowestPrice(menorValor.price)
                setPriceFilter([menorValor.price, maiorValor.price])
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productsList]);

    return (
        <LayoutBase showResearchInput showUserInfo showTabBar showBanner showActions={isLogged}>
            <Box display='flex' justifyContent='center' alignItems='center' height='auto' paddingBottom={4}>
                <Box width='90%' height='100%' display='flex' flexDirection='column' gap={2}>
                    {isLoading ?
                        <Box height='400px' width='100%' display='flex' justifyContent='center' alignItems='center'>
                            <CircularProgress size='4rem' />
                        </Box>
                        :
                        <>
                            <Filter
                                highestPrice={highestPrice}
                                lowestPrice={lowestPrice}
                                priceFilter={priceFilter}
                                setPriceFilter={setPriceFilter}
                                filterPage={filterPage}
                                setFilterPage={setFilterPage}
                                setFilterNumberPerPage={setFilterNumberPerPage}
                                handleSliderEnd={handleSliderEnd}
                            />
                            <Divider />
                            <ProductList products={productsList} />
                        </>
                    }
                    <Box width='100%' display='flex' justifyContent='center' alignItems='center' margin={4}>
                        <Pagination
                            page={Number(page)}
                            count={Math.ceil(totalCount / filterNumberPerPage)}
                            size='large'
                            onChange={(_, newPage) => { 
                                setSearchParams({ page: newPage.toString() }, { replace: true })
                            }}
                        />
                    </Box>
                </Box>
            </Box>
        </LayoutBase>
    );
}