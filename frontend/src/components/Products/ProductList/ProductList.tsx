import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Box, Grid, useMediaQuery, useTheme } from "@mui/material";

import { ProductCard } from "../ProductCard";
import { ProductCardMobile } from "../../mobile";
import { getAllProducts } from "../../../services";
import { IProducts } from "../../../types";

interface ProductListProps {
    filter: 20 | 40 | 60 | 80 | 100
}

export function ProductList({ filter }: ProductListProps) {

    const [productList, setProductList] = useState<IProducts[]>([]);

    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()
    const page = () => searchParams.get('page') || '1'

    const theme = useTheme()
    const smDown = useMediaQuery(theme.breakpoints.down('sm'))

    useEffect(() => {
        getAllProducts(false, true, filter )
            .then(products => {
                setProductList(products)
            })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filter]);

    

    return (
        <Box height='auto'width='100%'>
            <Grid container rowGap={2} columnGap={2} justifyContent='center'>
                {productList.map(product => (
                    <Grid item xs={12} sm={5} md={3} lg={2} key={product.id} display='flex' justifyContent='center' alignItems='center'>
                        {smDown ? 
                            <ProductCardMobile
                                id={product.id}
                                img={product.img}
                                name={product.name}
                                price={product.price}
                                rating={product.rating}
                                seeProduct={() => navigate(`/product/${product.id}`)}
                            />
                            :
                            <ProductCard
                                id={product.id}
                                img={product.img}
                                name={product.name}
                                price={product.price}
                                rating={product.rating}
                            />
                        }
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
