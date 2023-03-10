import { useContext } from "react";
import { Box, Button, Divider, Paper, Rating, Typography } from "@mui/material";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import DeleteIcon from '@mui/icons-material/Delete';
import { ProductInCart } from "./ProductInCart";
import { ProductsContext } from "../../../contexts";

type CepOptions = {
    name: string,
    rating: number,
    price: string,
    days: number
}

export function ListProductsInCart() {

    const { productsInCart } = useContext(ProductsContext)

    const cepOptions: CepOptions[] = [
        { name: 'Rede Sul', rating: 5, price: 'R$ 22,69', days: 4 },
        { name: 'Sedex', rating: 4.5, price: 'R$ 23,12', days: 6 },
        { name: 'GFL', rating: 5, price: 'R$ 30,24', days: 9 },
        { name: 'Correios PAC', rating: 4.5, price: 'R$ 47,49', days: 5 },
    ]

    return (
        <Box height='auto' component={Paper} elevation={2} padding={2} display='flex' flexDirection='column' gap={2} >
            <Box display='flex' alignItems='center' justifyContent='space-between'>
                <Box display='flex' alignItems='center' gap={1} height='auto'>
                    <ShoppingBasketIcon color="primary" />
                    <Typography variant="h5" fontWeight='bold'>
                        PRODUTO E FRETE
                    </Typography>
                </Box>
                <Box display='flex' alignItems='center'>
                    <Button variant="outlined" color="error" startIcon={<DeleteIcon/>}>
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
                    {cepOptions.map(option => {
                            return (
                                <Box key={option.name} display='flex' justifyContent='space-between' alignItems='center'>
                                    <Box display='flex' flexDirection='column' height='100%' alignItems='start' justifyContent='center'>
                                        <Typography variant='subtitle1' color='black' fontWeight='bold'>
                                            {option.name}
                                        </Typography>
                                        <Rating value={option.rating} precision={0.5} size='small' readOnly max={5} />
                                    </Box>
                                    <Box display='flex' flexDirection='column' height='100%' alignItems='start' justifyContent='center'>
                                        <Typography variant='subtitle1' color='black' fontWeight='bold'>
                                            {option.price}
                                        </Typography>
                                        <Typography variant='subtitle2' color='black' fontWeight='light'>
                                            até {option.days} dias úteis
                                        </Typography>
                                    </Box>

                                </Box>
                            )
                        })
                    }
                </Box>
            </Box>
        </Box>
    );
}
