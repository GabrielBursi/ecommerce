import { useNavigate } from "react-router-dom";
import { Box, Grid, Skeleton, useMediaQuery, useTheme } from "@mui/material";

import { ProductCard } from "../ProductCard";
import { ProductCardMobile } from "../../mobile";
import { IProducts } from "../../../types";
interface ProductListProps {
    products: IProducts[],
    isLoading: boolean
}

export function ProductList({ products, isLoading }: ProductListProps) {

    const navigate = useNavigate()

    const theme = useTheme()
    const smDown = useMediaQuery(theme.breakpoints.down('sm'))

    return (
        <Box height='auto' width='100%'>
            <Grid container rowGap={2} columnGap={2} display='flex' justifyContent='center' alignItems='center'>
                {isLoading ?
                    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((skeleton) => (
                        <Grid item xs={12} sm={5} md={3} lg={2} key={skeleton} display='flex' justifyContent='center' alignItems='center'>
                            <Skeleton sx={{ width:270, height:390 }} />
                        </Grid>
                    ))
                    :
                    products.map(product => (
                        <Grid item xs={12} sm={5} md={3} lg={2} key={product.uuid} display='flex' justifyContent='center' alignItems='center'>
                            {smDown ?
                                <ProductCardMobile
                                    uuid={product.uuid}
                                    img={product.img}
                                    name={product.name}
                                    price={product.price}
                                    rating={product.rating}
                                    seeProduct={() => navigate(`/product/${product.uuid}`)}
                                />
                                :
                                <ProductCard
                                    uuid={product.uuid}
                                    img={product.img}
                                    name={product.name}
                                    price={product.price}
                                    rating={product.rating}
                                />
                            }
                        </Grid>
                    ))
                }
            </Grid>
        </Box>
    );
}
