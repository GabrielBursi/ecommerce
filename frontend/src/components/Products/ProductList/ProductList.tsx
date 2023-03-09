import { useContext } from "react";
import { Box, Grid, useMediaQuery, useTheme } from "@mui/material";
import { ProductsContext } from "../../../contexts";
import { ProductCard } from "../ProductCard";
import { ProductCardMobile } from "../../mobile";
import { useNavigate } from "react-router-dom";

interface ProductListProps {
    filter: number
}

export function ProductList({ filter }: ProductListProps) {

    const { products } = useContext(ProductsContext)

    const navigate = useNavigate()

    const theme = useTheme()
    const smDown = useMediaQuery(theme.breakpoints.down('sm'))

    return (
        <Box height='auto'>
            <Grid container rowGap={4}>
                {products.map(product => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={product.id} display='flex' justifyContent='center' alignItems='center'>
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
