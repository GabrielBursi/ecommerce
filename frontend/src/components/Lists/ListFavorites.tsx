import { useContext, useState } from "react";
import { Box, Button, Divider, IconButton, Paper, Rating, Typography, useMediaQuery, useTheme } from "@mui/material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { IProducts } from "../../types";
import { MyImage } from "../Products/MyImage";
import { ProductsContext } from "../../contexts";
import { ListFavoriteMobile } from "../mobile";

export function ListFavorites({ name, img, price, rating, uuid }: IProducts) {

    const theme = useTheme()
    const mdDown = useMediaQuery(theme.breakpoints.down('md'))
    const lgDown = useMediaQuery(theme.breakpoints.down('lg'))
    const smDown = useMediaQuery(theme.breakpoints.down('sm'))

    const [color, setColor] = useState(false);
    const [isAlreadyInCart, setIsAlreadyInCart] = useState<boolean>(false);

    const { addProductInCart, removeProductFavorited } = useContext(ProductsContext)

    const brand = name.split(' ')[0]
    const nameWithoutBrand = name.replace(name.split(' ')[0], '')

    if(smDown) 
    return <ListFavoriteMobile
            uuid={uuid}
            key={uuid}
            img={img}
            name={name}
            price={price}
            rating={rating}
        />

    return (
        <Box component={Paper} display='flex' alignItems='center' width='100%' height={mdDown ? '185px' : '220px'} padding={2} gap={1} elevation={2}>

            <Box display='flex' alignItems='center' width='60%' height='100%' gap={2}>
                <Box  width='auto' minWidth='20%' height='auto' maxHeight='200px' display='flex' alignItems='center' justifyContent='center'>
                    <MyImage alt={name} src={img} height='auto' width={mdDown ? '110px' : '140px'}/>
                </Box>
                <Box flex={1}  maxWidth='650px' height='100%' display='flex' flexDirection='column' >
                    <Box maxWidth='100%' maxHeight='100%'>
                        <Typography component='span' variant={mdDown ? 'subtitle2' : 'subtitle1'} fontWeight="light">
                            {brand}
                        </Typography>
                        <Typography 
                            component='h1' 
                            variant={ lgDown ? 'h6' : 'h5'} 
                            sx={{ cursor: 'pointer', wordBreak: 'break-word', display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical" }} 
                            onMouseOver={() => setColor(true)} 
                            onMouseLeave={() => setColor(false)} 
                            color={color ? 'primary' : 'black'}
                            fontWeight="bold"
                            overflow='hidden'
                            textOverflow="ellipsis"
                        >
                            {nameWithoutBrand} 
                        </Typography>
                    </Box>
                    <Box>
                        <Rating value={rating} precision={0.5} readOnly max={5} size='small'/>
                    </Box>
                </Box>
            </Box>
            <Divider orientation="vertical" flexItem />
            <Box flex={1} height='100%' display='flex' flexDirection="column" alignItems='center' justifyContent='space-between' gap={1}>
                <Box width='100%' display='flex' justifyContent='end' alignItems='center'>
                    <IconButton size="medium">
                        <FavoriteIcon color="primary" fontSize="large"onClick={() => removeProductFavorited(uuid)}/>
                    </IconButton>
                </Box>
                <Box width='100%' height='100%' display='flex' justifyContent='center' alignItems='center'>
                    <Typography color='primary' variant={mdDown ? 'h4' : 'h3'} fontWeight='bold'>
                        {price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </Typography>
                </Box>
                <Box width='100%' height='100%' display='flex' justifyContent='center' alignItems='center'>
                    <Button 
                        variant="contained" 
                        startIcon={ isAlreadyInCart ? <ShoppingCartCheckoutIcon/> : <AddShoppingCartIcon/>} 
                        fullWidth 
                        size="large" 
                        onClick={() => {
                            uuid && addProductInCart(isAlreadyInCart, uuid)
                            setIsAlreadyInCart(true)
                        }}
                    >
                        { isAlreadyInCart ? 'NO CARRINHO' : 'COMPRAR'}
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}