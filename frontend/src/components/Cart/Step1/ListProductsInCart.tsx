import { useContext, useState } from "react";

import { Box, Button, Divider, Paper, Typography } from "@mui/material";
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import DeleteIcon from '@mui/icons-material/Delete';

import { ProductsContext } from "../../../contexts";

import { ModalAction } from "../../Modal";
import { ListOptionsCep } from "./ListOptionsCep";
import { ProductInCart } from "./ProductInCart";

interface ListProductsInCartProps {
    showDetails?: boolean;
}

export function ListProductsInCart({ showDetails = false }: ListProductsInCartProps) {
    const { productsInCart, setProductsInCart } = useContext(ProductsContext)

    const [isOpen, setIsOpen] = useState(false);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    
    function clearCart() {
        setProductsInCart([])
        setIsOpen(false)
    }

    return (
        <Box height='auto' component={Paper} elevation={2} padding={2} display='flex' flexDirection='column' gap={2}>
            <ModalAction 
                isOpen={isOpen} 
                setIsOpen={setIsOpen} 
                question='Você tem certeza que deseja remover todos os produtos do carrinho?' 
                action={clearCart} 
                title='REMOVER PRODUTOS'
            />
            <Box display='flex' alignItems='center' justifyContent='space-between'>
                <Box display='flex' alignItems='center' gap={1} height='auto'>
                    <ShoppingBasketIcon color="primary" />
                    <Typography variant="h5" fontWeight='bold'>
                        {showDetails ? 'LISTA DE PRODUTOS' : 'PRODUTO E FRETE'}  
                    </Typography>
                </Box>
                { !showDetails &&
                    <Box display='flex' alignItems='center'>
                        <Button variant="outlined" color="error" startIcon={<DeleteIcon/>} onClick={() => setIsOpen(true)}>
                            REMOVER TODOS OS PRODUTOS
                        </Button>
                    </Box>
                }
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
                        hideDetails
                    />
                ))}
                { !showDetails && <ListOptionsCep/> }
            </Box>
        </Box>
    );
}
