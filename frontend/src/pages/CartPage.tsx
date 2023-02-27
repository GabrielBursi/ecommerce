import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { ListFavorites } from "../components";
import { ProductsContext } from "../contexts";
import { LayoutBase } from "../layouts";

export function CartPage() {

    const theme = useTheme()
    const mdDown = useMediaQuery(theme.breakpoints.down('md'))
    const smDown = useMediaQuery(theme.breakpoints.down('sm'))

    const { productsInCart } = useContext(ProductsContext)

    const navigate = useNavigate()

    return (
        <LayoutBase showActions showResearchInput showUserInfo>
            <Box display='flex' justifyContent='center' alignItems='center' width='100%' height='100%' >
                <Box display='flex' flexDirection='column' width='95%' height='100%' paddingY={2} gap={2}>
                    <Box height="10%" display='flex' alignItems='center'>
                        <Typography variant={smDown ? 'h4' : mdDown ? 'h3' : 'h2'} color='primary'>
                            {smDown ? <ArrowBackIosNewIcon onClick={() => { navigate('/') }} /> : <AddShoppingCartIcon fontSize="large" />} CARRINHO (temporario)
                        </Typography>
                    </Box>
                    <Box flex={1} display='flex' flexDirection='column' gap={2}>
                        {
                            productsInCart.map(product => (
                                <ListFavorites
                                    id={product.id}
                                    key={product.id}
                                    img={product.img}
                                    title={product.title}
                                    price={product.price}
                                    rating={product.rating}
                                />
                            ))
                        }
                    </Box>
                </Box>
            </Box>
        </LayoutBase>
    );
}