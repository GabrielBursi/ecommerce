import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Box, Button, Typography, useMediaQuery, useTheme } from "@mui/material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { IProducts } from "../../../types";
import { LoginContext, ProductsContext } from "../../../contexts";

interface PriceProps {
    product: IProducts, 
}

export function Price({ product }: PriceProps) {

    const theme = useTheme()
    const mdDown = useMediaQuery(theme.breakpoints.down('md'))

    const navigate = useNavigate()

    const [isAlreadyInCart, setIsAlreadyInCart] = useState(false);

    const { filterProductsAndSetFavoriteOrInCart, productsInCart, addProductInCart } = useContext(ProductsContext)
    const { isLogged } = useContext(LoginContext)

    useEffect(() => {
        filterProductsAndSetFavoriteOrInCart(productsInCart, product.uuid, setIsAlreadyInCart)
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [product.uuid, productsInCart]);

    return (
        <Box flex={1}>
            <Box minHeight='60%' display='flex' flexDirection='column'>
                <Box flex={1} display='flex' alignItems='center'>
                    <Typography color='primary' variant={mdDown ? "h4" : "h2"} fontWeight='bold'>
                        {product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </Typography>
                </Box>
                <Box minWidth='200px' width='50%' height='30%' display='flex' justifyContent='center'>
                    <Button
                        variant="contained"
                        fullWidth
                        size={mdDown ? "medium" : "large"}
                        startIcon={isAlreadyInCart ? <ShoppingCartCheckoutIcon /> : <AddShoppingCartIcon />}
                        sx={{ fontSize: mdDown ? '1rem' : '1.4rem' }}
                        onClick={() => {
                            addProductInCart(isLogged, navigate, isAlreadyInCart, product, product.uuid)
                        }}
                    >
                        {isAlreadyInCart ? 'NO CARRINHO' : 'COMPRAR'}
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}
