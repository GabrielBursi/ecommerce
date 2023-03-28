import { useContext, useEffect, useState } from "react";
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
    const [numberFilterPage, setNumberFilterPage] = useState(Number(filterPage.split(' ')[0]));
    const [productList, setProductList] = useState<IProducts[]>([]);
    const [totalCount, setTotalCount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const { product } = useParams<'product'>()
    const [searchParams, setSearchParams] = useSearchParams()
    const page = searchParams.get('page') || '1'

    useEffect(() => {

        setIsLoading(true)

        getAllProducts(false, true, numberFilterPage as 20 | 40 | 60 | 80 | 100, page)
            .then(products => {

                setIsLoading(false)

                if (typeof products === 'object' && 'data' in products && 'totalCount' in products){
                    setProductList(products.data)
                    setTotalCount(products.totalCount)
                }
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [numberFilterPage, page]);

    return (
        <LayoutBase showResearchInput showUserInfo showTabBar showBanner showActions = {isLogged}>
            <Box display='flex' justifyContent='center' alignItems='center' height='auto' paddingBottom={4}>
                <Box width='90%' height='100%' display='flex' flexDirection='column' gap={2} border='1px solid red'>
                    <Filter 
                        product={product} 
                        filterPage={filterPage} 
                        setFilterPage={setFilterPage} 
                        setNumberFilterPage={setNumberFilterPage}
                    />
                    <Divider/>
                    {isLoading ? 
                        <Box height='400px' width='100%' display='flex' justifyContent='center' alignItems='center'>
                            <CircularProgress size='4rem'/>
                        </Box> 
                        : 
                        <ProductList products={productList}/>
                    }
                    <Box width='100%' display='flex' justifyContent='center' alignItems='center' margin={4}>
                        <Pagination
                            page={Number(page)}
                            count={Math.ceil(totalCount / numberFilterPage)}
                            size='large'
                            onChange={(_, newPage) => {setSearchParams({page: newPage.toString()}, {replace: true})}}
                        />
                    </Box>
                </Box>
            </Box>
        </LayoutBase>
    );
}