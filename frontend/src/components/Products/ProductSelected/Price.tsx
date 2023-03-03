import { Box, Button, Typography } from "@mui/material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { IProducts } from "../../../types";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { LoginContext, ProductsContext } from "../../../contexts";

interface PriceProps {
    product: IProducts, 
}

export function Price({ product }: PriceProps) {

    const navigate = useNavigate()

    const [isAlreadyInCart, setIsAlreadyInCart] = useState(false);

    const { filterProductsAndSetFavoriteOrInCart, productsInCart, addProductInCart } = useContext(ProductsContext)
    const { isLogged } = useContext(LoginContext)

    useEffect(() => {
        filterProductsAndSetFavoriteOrInCart(productsInCart, product.id, setIsAlreadyInCart)
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [product.id, productsInCart]);

    return (
        <Box flex={1}>
            <Box height='60%' display='flex' flexDirection='column'>
                <Box flex={1} display='flex' alignItems='center'>
                    <Typography color='primary' variant="h2" fontWeight='bold'>
                        {product.price}
                    </Typography>
                </Box>
                <Box width='50%' height='30%' display='flex' justifyContent='center'>
                    <Button
                        variant="contained"
                        fullWidth
                        size="large"
                        startIcon={isAlreadyInCart ? <ShoppingCartCheckoutIcon /> : <AddShoppingCartIcon />}
                        sx={{ fontSize: '1.5rem' }}
                        onClick={() => {
                            addProductInCart(isLogged, navigate, isAlreadyInCart, product, product.id)
                        }}
                    >
                        {isAlreadyInCart ? 'NO CARRINHO' : 'COMPRAR'}
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}
