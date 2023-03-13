import { useContext, useState } from "react";
import { Box, Button, Divider, Paper, Typography } from "@mui/material";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import DeleteIcon from '@mui/icons-material/Delete';
import { ProductInCart } from "./ProductInCart";
import { ProductsContext } from "../../../contexts";
import { Cep } from "../../CEP";
import { ModalClearCart } from "../../Modal";

export function ListProductsInCart() {

    const { productsInCart, cepOptions, setProductsInCart } = useContext(ProductsContext)

    const [isOpen, setIsOpen] = useState(false);

    function clearCart() {
        setProductsInCart([])
        setIsOpen(false)
    }

    return (
        <Box height='auto' component={Paper} elevation={2} padding={2} display='flex' flexDirection='column' gap={2}>
            <ModalClearCart isOpen={isOpen} setIsOpen={setIsOpen} question='Você tem certeza que deseja remover todos os produtos do carrinho?' action={clearCart} />
            <Box display='flex' alignItems='center' justifyContent='space-between'>
                <Box display='flex' alignItems='center' gap={1} height='auto'>
                    <ShoppingBasketIcon color="primary" />
                    <Typography variant="h5" fontWeight='bold'>
                        PRODUTO E FRETE
                    </Typography>
                </Box>
                <Box display='flex' alignItems='center'>
                    <Button variant="outlined" color="error" startIcon={<DeleteIcon/>} onClick={() => setIsOpen(true)}>
                        REMOVER TODOS OS PRODUTOS
                    </Button>
                </Box>
            </Box>
            <Divider/>
            <Box height='auto' display='flex' flexDirection='column' gap={4}>
                {productsInCart.map(product => (
                    <ProductInCart 
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        img={product.img}
                        price={product.price}
                    />
                ))}
                <Divider />
                <Box height='auto' bgcolor='#fafafb' padding={2}>
                    <Box display='flex' alignItems='center' gap={1} height='auto'>
                        <LocalShippingIcon color="primary" />
                        <Typography variant="h5" fontWeight='bold'>
                            FRETE:
                        </Typography>
                    </Box>
                    {cepOptions.map(option => (
                        <Cep days={option.days}
                            name={option.name}
                            price={option.price}
                            rating={option.rating}
                            key={option.name}
                            showInputRadio 
                        />
                        ))
                    }
                </Box>
            </Box>
        </Box>
    );
}
