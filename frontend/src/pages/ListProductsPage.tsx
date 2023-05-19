import { useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router-dom";
import { Box, Divider, Pagination, Skeleton, useMediaQuery, useTheme } from "@mui/material";
import { LoginContext, ProductsListContext } from "../contexts";
import { LayoutBase } from "../layouts";
import { Limit, ProductList, SliderComponent } from "../components";
import { ServicesProducts } from "../services/api";
import { Category, LimitProductsPerPage } from "../types";

export function ListProductsPage() {

    const theme = useTheme()
    const mdDown = useMediaQuery(theme.breakpoints.down('md'))
    const smDown = useMediaQuery(theme.breakpoints.down('sm'))

    const { isLogged } = useContext(LoginContext)
    const { productsList, setProductsList, setFilterPerPage } = useContext(ProductsListContext)

    const [totalCount, setTotalCount] = useState(0);

    const { product: category } = useParams<'product'>()
    const [searchParams, setSearchParams] = useSearchParams()
    const page = searchParams.get('page') || '1'
    const limit = searchParams.get('limit') || '20'
    const min = searchParams.get('min') || '1'
    const max = searchParams.get('max') || '99999999'

    const onSuccess = () => {
        if (data instanceof Error) {
            console.log(`Data é erro - ${data.message}`);
            onError()
            return
        }

        if (!data) {
            console.log(`Data é undefined - ${data}`);
            onError()
            return
        }

        console.log(data);

        setProductsList(data.products)
        setTotalCount(data.totalCount)
    }

    const onError = () => {
        console.log(`Deu erro no useQuery? ${isError} - ${error} - valor do data: ${data}`);
        if (isError) {
            console.log('Ocorreu um erro com useQuery: ' + error) //* erro com o useQuery
            return
        }

        if (data instanceof Error) {
            console.log('Ocorreu um erro com a API: ' + data.message); //* data é uma instância de Error ou undefined
        }
    }

    const { data, isLoading, isError, error } = useQuery(
        ['products', category, Number(page), limit],
        () => ServicesProducts.getProductsByCategory(
            category as Category,
            Number(page),
            Number(limit) as LimitProductsPerPage,
            Number(min),
            Number(max)
        )
        , {
            onSuccess,
            onError,
            // keepPreviousData: true,
            // staleTime: 5000,
            // refetchOnReconnect: true,
            // refetchOnMount: true,
            // retry: true
        }
    )

    useEffect(() => {
        setFilterPerPage('20 por página')
        setSearchParams({ page: '1', limit: '20', min: '1', max: '999999' }, { replace: true })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [category]);

    return (
        <LayoutBase showResearchInput showUserInfo showTabBar showBanner showActions={isLogged}>
            <Box display='flex' justifyContent='center' alignItems='center' height='auto' paddingBottom={4}>
                <Box width='90%' height='100%' display='flex' flexDirection='column' gap={2}>
                    <Box
                        height='100px'
                        display='flex'
                        justifyContent={smDown ? 'center' : mdDown ? 'space-between' : 'center'}
                        alignItems={smDown ? 'center' : 'end'} gap={smDown ? 0 : 2}
                        flexDirection={smDown ? 'column' : 'row'}
                        marginTop={smDown ? 1 : 0}
                    >
                        {isLoading ? <Skeleton width={smDown ? '100%' : mdDown ? '50%' : '30%'} height='65%' /> : <SliderComponent products={productsList}/>}
                        {isLoading ? <Skeleton width={smDown ? '100%' : mdDown ? '50%' : '30%'} height='65%' /> : <Limit />}
                    </Box>
                    <Divider />
                    <ProductList products={productsList} isLoading={isLoading} />
                    <Box width='100%' display='flex' justifyContent='center' alignItems='center' margin={4}>
                        <Pagination
                            page={Number(page)}
                            count={Math.ceil(totalCount / Number(limit))}
                            size='large'
                            onChange={(_, newPage) => {
                                setSearchParams({ 
                                    page: newPage.toString(), 
                                    limit, 
                                    min, 
                                    max, 
                                }, { replace: true })
                            }}
                        />
                    </Box>
                </Box>
            </Box>
        </LayoutBase>
    );
}