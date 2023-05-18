import { useContext, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router-dom";
import { Box, Divider, Pagination, Skeleton, useMediaQuery, useTheme } from "@mui/material";
import { LoginContext, ProductsListContext } from "../contexts";
import { LayoutBase } from "../layouts";
import { Limit, ProductList, SliderComponent } from "../components";
import { ServicesProducts } from "../services/api";
import { Category } from "../types";

export function ListProductsPage() {

    const theme = useTheme()
    const mdDown = useMediaQuery(theme.breakpoints.down('md'))
    const smDown = useMediaQuery(theme.breakpoints.down('sm'))

    const { isLogged } = useContext(LoginContext)
    const { limit, priceFilter, setLimit, setFilterPerPage, productsList, totalCount, calculateMaxAndMinPrice, setProductsList, setTotalCount, filterPerPage } = useContext(ProductsListContext)

    const { product: category } = useParams<'product'>()
    const [searchParams, setSearchParams] = useSearchParams()
    const page = searchParams.get('page') || '1'

    const onSuccess = () => {
        if (data instanceof Error || !data) {
            onError()
            return
        }

        console.log(data);

        setProductsList(data.products)
        setTotalCount(data.totalCount)

        calculateMaxAndMinPrice(data.products)
    }

    const onError = () => {
        if (isError) {
            alert('Ocorreu um erro com useQuery: ' + error) //* erro com o useQuery
            return
        }

        if (data instanceof Error) {
            alert('Ocorreu um erro com a API: ' + data.message); //* data é uma instância de Error ou undefined
        }
    }

    const { data, isLoading, isError, error } = useQuery(
        ['teste', category, limit, priceFilter, page, filterPerPage],
        () => ServicesProducts.getProductsByCategory(category as Category, Number(page), limit, priceFilter[0], priceFilter[1])
        , {
            onSuccess,
            onError,
        }
    )

    useEffect(() => {
        setFilterPerPage('20 por página')
        setLimit(20)
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
                        {isLoading ? <Skeleton width={smDown ? '100%' : mdDown ? '50%' : '30%'} height='65%' /> : <SliderComponent />}
                        {isLoading ? <Skeleton width={smDown ? '100%' : mdDown ? '50%' : '30%'} height='65%' /> : <Limit />}
                    </Box>
                    <Divider />
                    <ProductList products={productsList} />
                    <Box width='100%' display='flex' justifyContent='center' alignItems='center' margin={4}>
                        <Pagination
                            page={Number(page)}
                            count={Math.ceil(totalCount / limit)}
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