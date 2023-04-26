import { useContext, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { IProducts } from "../../../types";
import { ProductsContext } from "../../../contexts";
import { SearchCepMobile } from "./SearchCepMobile";

interface PriceProps {
    product: IProducts, 
}

export function PriceMobile({ product }: PriceProps) {

    const [isAlreadyInCart, setIsAlreadyInCart] = useState(false);

    const { addProductInCart } = useContext(ProductsContext)

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
                        startIcon={isAlreadyInCart ? <ShoppingCartCheckoutIcon /> : <AddShoppingCartIcon />}
                        sx={{ fontSize: '1.2rem'}}
                        onClick={() => {
                            addProductInCart(isAlreadyInCart, product.uuid)
                            setIsAlreadyInCart(true)
                        }}
                    >
                        {isAlreadyInCart ? 'NO CARRINHO' : 'COMPRAR'}
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}
