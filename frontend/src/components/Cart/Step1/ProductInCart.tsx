import { useContext, useState } from "react";
import { useMatch } from "react-router-dom";
import { Box, Button, CircularProgress, IconButton, Typography } from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import DeleteIcon from '@mui/icons-material/Delete';
import { IProducts } from "../../../types";
import { MyImage } from "../../Products";
import { ProductsContext, ShoppingContext } from "../../../contexts";
import { ModalAction } from "../../Modal";

export function ProductInCart({ uuid, img, name, price }: IProducts) {

    const { userShop } = useContext(ShoppingContext)
    const { removeProductInCart, alterQuantProduct } = useContext(ProductsContext)

    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const productInUse = userShop?.cart.products.filter(product => product.uuid === uuid) || []
    const [product, setProduct] = useState<IProducts>(productInUse[0]);

    const match = useMatch('/cart/identification/payment/confirm')
    const isConfirmationPage = match?.pathname === '/cart/identification/payment/confirm'
    const brand = name.split(' ')[0]
    const nameWithoutBrand = name.replace(name.split(' ')[0], '')

    return (
        <Box width='100%' height='160px' display='flex' alignItems='center' justifyContent='center' gap={2}>
            <ModalAction 
                action={async () => await removeProductInCart(uuid)} 
                question='Você tem certeza que deseja remover esse produto do carrinho?' 
                isOpen={isOpen} 
                setIsOpen={setIsOpen}
                title='REMOVER PRODUTO'
            />
            <Box width='auto' minWidth='10%' height='auto' maxHeight='200px' display='flex' alignItems='center' justifyContent='center'>
                <MyImage alt={name} src={img} height='auto' width='100px'/>
            </Box>
            <Box flex={1} maxWidth='500px' height='100%' display='flex' flexDirection='column'>
                <Typography component='span' variant='subtitle1' fontWeight="light">
                    {brand}
                </Typography>
                <Typography
                    component='h1'
                    variant='h6'
                    sx={{ cursor: 'pointer', wordBreak: 'break-word', display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical" }}
                    color='black'
                    fontWeight="bold"
                    overflow='hidden'
                    textOverflow="ellipsis"
                >
                    {nameWithoutBrand}
                </Typography>
            </Box>
            <Box width='15%' height='100%' display='flex' alignItems='center' justifyContent='center' flexDirection='column'>
                <Typography>
                    Quantidade
                </Typography>
                <Box width='60%' height='40%' display='flex' alignItems='center' justifyContent='center' gap={2}>
                    { !isConfirmationPage &&
                        <IconButton 
                            size="small" 
                            color="primary" 
                            onClick={async () => {
                                setIsLoading(true)
                                await alterQuantProduct(uuid, '-', setProduct)
                                setIsLoading(false)
                            }} 
                            disabled = {product.quant === 1 || isLoading}
                        >
                            <ArrowBackIosIcon/>
                        </IconButton>
                    }
                    <Typography color='black' variant='h6' fontWeight='bold'>
                        {product.quant}
                    </Typography>
                    { !isConfirmationPage &&
                        <IconButton 
                            size="small" 
                            color="primary" 
                            onClick={async () => {
                                setIsLoading(true)
                                await alterQuantProduct(uuid, '+', setProduct)
                                setIsLoading(false)
                            }}
                            disabled={isLoading}
                        >
                            <ArrowForwardIosIcon />
                        </IconButton>
                    }
                </Box>
                { !isConfirmationPage &&
                    <Button color="error" startIcon={<DeleteIcon />} size="small" onClick={() => setIsOpen(true)}>
                        REMOVER
                    </Button>
                }
            </Box>
            <Box width='15%' height='100%' display='flex' alignItems='center' justifyContent='center' flexDirection='column'>
                {isLoading ? 
                    <CircularProgress color="primary" sx={{ fontSize: '0.4rem' }} /> 
                    : 
                    <>
                        { product.quant && product.quant > 1 &&
                            <Typography color='black' variant='body2' fontWeight='light'>
                                {product.quant}x {price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                            </Typography>
                        }
                        <Typography color='primary' variant='h5' fontWeight='bold'>
                            {(Number(price) * (product.quant || 1)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        </Typography>
                    </>
                }
            </Box>
        </Box>
    );
}
