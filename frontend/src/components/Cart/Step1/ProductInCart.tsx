import { useContext, useEffect, useState } from "react";
import { Box, Button, IconButton, Typography } from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import DeleteIcon from '@mui/icons-material/Delete';
import { IProducts } from "../../../types";
import { MyImage } from "../../Products";
import { ProductsContext } from "../../../contexts";
import { ModalClearCart } from "../../Modal";

export function ProductInCart({ id, img, name, price }: IProducts) {

    const { productsInCart, setProductsInCart } = useContext(ProductsContext)
    const [isOpen, setIsOpen] = useState(false);
    const [quant, setQuant] = useState(1);
    const [priceQuant, setPriceQuant] = useState<number>(Number(price.replace(',', '').replace('$ ', '')));


    useEffect(() => {
        console.log(priceQuant.toFixed(2));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [quant]);

    const brand = name.split(' ')[0]
    const nameWithoutBrand = name.replace(name.split(' ')[0], '')

    function addQuant(){
        setQuant(oldQuant => oldQuant + 1)
        setPriceQuant(Number(price.replace(',', '').replace('$ ', '')) * quant)
    }
    
    function removeQuant(){
        setQuant(oldQuant => oldQuant - 1)
        setPriceQuant((Number(price.replace(',', '').replace('$ ', '')) * quant) - Number(price.replace(',', '').replace('$ ', '')))
    }

    function removeProductCart(){
        const productRemoved = productsInCart.filter(product => product.id !== id)
        setProductsInCart(productRemoved)
    }

    return (
        <Box width='100%' height='160px' display='flex' alignItems='center' justifyContent='center' gap={2}>
            <ModalClearCart action={removeProductCart} question='Você tem certeza que deseja remover esse produto do carrinho?' isOpen={isOpen} setIsOpen={setIsOpen} />
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
                    <IconButton size="small" color="primary" onClick={removeQuant} disabled = {quant === 1}>
                        <ArrowBackIosIcon/>
                    </IconButton>
                    <Typography color='black' variant='h6' fontWeight='bold'>
                        {quant}
                    </Typography>
                    <IconButton size="small" color="primary" onClick={addQuant}>
                        <ArrowForwardIosIcon />
                    </IconButton>
                </Box>
                <Button color="error" startIcon={<DeleteIcon />} size="small" onClick={() => setIsOpen(true)}>
                    REMOVER
                </Button>
            </Box>
            <Box width='15%' height='100%' display='flex' alignItems='center' justifyContent='center'>
                <Typography color='primary' variant='h5' fontWeight='bold'>
                    {price}
                </Typography>
            </Box>
        </Box>
    );
}
