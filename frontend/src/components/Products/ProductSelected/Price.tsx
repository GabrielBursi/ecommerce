import { useContext, useEffect, useState } from "react";
import { Box, Button, Typography, useMediaQuery, useTheme } from "@mui/material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { IProducts } from "../../../types";
import { ProductsContext, ShoppingContext } from "../../../contexts";

interface PriceProps {
    product: IProducts, 
}

export function Price({ product }: PriceProps) {

    const theme = useTheme()
    const mdDown = useMediaQuery(theme.breakpoints.down('md'))

    const [isAlreadyInCart, setIsAlreadyInCart] = useState(false);

    const { addProductInCart, isLoadingAddProduct } = useContext(ProductsContext)
    const { userShop } = useContext(ShoppingContext)

    useEffect(() => {
        const productFavoriteInCart = userShop?.cart.products.find(p => p.uuid === product.uuid)
        if (productFavoriteInCart) {
            setIsAlreadyInCart(true)
        }else{
            setIsAlreadyInCart(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [product.uuid]);


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
                        disabled={isLoadingAddProduct}
                        onClick={async () => {
                            await addProductInCart(product.uuid, isAlreadyInCart)
                        }}
                    >
                        {isAlreadyInCart ? 'NO CARRINHO' : 'COMPRAR'}
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}
