import { Box, Button, Typography } from "@mui/material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { id, IProducts } from "../../types";
import { NavigateFunction } from "react-router-dom";

interface PriceProps extends Pick<IProducts, 'price'> {
    addProductInCart: (isLogged: boolean, navigate: NavigateFunction, isAlreadyInCart: boolean, product: IProducts, id: id) => void,
    isLogged: boolean, 
    navigate: NavigateFunction, 
    isAlreadyInCart: boolean, 
    product: IProducts, 
}

export function Price({ price, addProductInCart, isAlreadyInCart, isLogged, navigate, product }: PriceProps) {
    return (
        <Box flex={1}>
            <Box height='60%' display='flex' flexDirection='column'>
                <Box flex={1} display='flex' alignItems='center'>
                    <Typography color='primary' variant="h2" fontWeight='bold'>
                        {price}
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
