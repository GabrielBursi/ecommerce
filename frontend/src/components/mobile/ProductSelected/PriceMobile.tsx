import { useContext, useEffect, useState } from "react";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { IProducts } from "../../../types";
import { ProductsContext, ShoppingContext } from "../../../contexts";
import { SearchCepMobile } from "./SearchCepMobile";

interface PriceProps {
    product: IProducts, 
}

export function PriceMobile({ product }: PriceProps) {

    const [isAlreadyInCart, setIsAlreadyInCart] = useState(false);

    const { addProductInCart, isLoadingAddProduct } = useContext(ProductsContext)
    const { userShop } = useContext(ShoppingContext)

    useEffect(() => {
        const productIsInCart = userShop?.cart.products.find(p => p.uuid === product.uuid)
        if (productIsInCart) {
            setIsAlreadyInCart(true)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userShop?.cart.products]);

    return (
        <Box height='40%' display='flex' flexDirection='column'  gap={2}>
            <Box height='60%' display='flex' flexDirection='column'>
                <Box width='100%' display='flex' alignItems='center'> {/* preço */}
                    <Typography color='primary' variant='h4' fontWeight='bold'>
                        {product.price}
                    </Typography>
                </Box>
                <Box>
                    <SearchCepMobile/>
                </Box>
                <Box width='100%'> {/* botão */}
                    <Button
                        variant="contained"
                        fullWidth
                        size="large"
                        startIcon={isLoadingAddProduct ? '' : isAlreadyInCart ? <ShoppingCartCheckoutIcon /> : <AddShoppingCartIcon />}
                        sx={{ fontSize: '1.2rem'}}
                        disabled={isLoadingAddProduct}
                        onClick={async () => {
                            await addProductInCart(product.uuid, isAlreadyInCart)
                        }}
                    >
                        {isLoadingAddProduct ? <CircularProgress color="primary" /> : isAlreadyInCart ? 'NO CARRINHO' : 'COMPRAR'}
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}
