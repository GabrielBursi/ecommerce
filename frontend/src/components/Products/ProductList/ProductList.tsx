import { useNavigate } from "react-router-dom";
import { Box, Grid, useMediaQuery, useTheme } from "@mui/material";

import { ProductCard } from "../ProductCard";
import { ProductCardMobile } from "../../mobile";
import { IProducts } from "../../../types";
interface ProductListProps {
    products: IProducts[]
}

export function ProductList({ products }: ProductListProps) {

    const navigate = useNavigate()

    const theme = useTheme()
    const smDown = useMediaQuery(theme.breakpoints.down('sm'))

    return (
        <Box height='auto' width='100%'>
            <Grid container rowGap={2} columnGap={2} display='flex' justifyContent='center' alignItems='center'>
                {products.map(product => (
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
