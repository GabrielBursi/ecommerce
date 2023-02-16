import { useState } from "react";
import { Box, Button, Divider, IconButton, Paper, Rating, Typography, useMediaQuery, useTheme } from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { IProducts } from "../../types";

export function ListFavorites({ title, img, price, rating }: IProducts) {

    const theme = useTheme()
    const mdDown = useMediaQuery(theme.breakpoints.down('md'))
    const smDown = useMediaQuery(theme.breakpoints.down('sm'))

    const [color, setColor] = useState(false);

    const brand = title.split(' ')[0]
    const nameWithoutBrand = title.replace(title.split(' ')[0], '')

    return (
        <Box component={Paper} display='flex' alignItems='center' width='100%' height='30%' padding={2} gap={1} elevation={2}>

            <Box display='flex' alignItems='center' justifyContent='space-between' width='60%' height='100%' gap={1}>
                <Box border='1px solid black' width='20%' height='100%'>
                    <img alt="teste" src={img}></img>
                </Box>
                <Box flex={1} height='100%' display='flex' flexDirection='column'>
                    <Typography component='span' variant={smDown ? 'body2' : mdDown ? 'subtitle2' : 'subtitle1'} fontWeight="light">
                        {brand}
                    </Typography>
                    <Typography 
                        component='h1' 
                        variant={smDown ? 'h6' : mdDown ? 'h6' : 'h5'} 
                        sx={{ cursor: 'pointer' }} 
                        onMouseOver={() => setColor(true)} 
                        onMouseLeave={() => setColor(false)} 
                        color={color ? 'primary' : 'black'}
                        fontWeight="bold"
                    >
                        {nameWithoutBrand} 
                    </Typography>
                    <Box>
                        <Rating value={rating} precision={0.5} readOnly max={5} size='small'/>
                    </Box>
                </Box>
            </Box>
            <Divider orientation="vertical" flexItem />
            <Box flex={1} height='100%' display='flex' alignItems='center' justifyContent='space-between' gap={1}>
                <Box minWidth='45%' height='100%' display='flex' justifyContent='center' alignItems='center'>
                    <Typography color='primary' variant={smDown ? 'h5' : mdDown ? 'h4' : 'h3'} fontWeight='bold'>
                        {price}
                    </Typography>
                </Box>
                <Box flex={1} height='100%' display='flex' flexDirection='column' alignItems='flex-end'>
                    <IconButton size="large">
                        <FavoriteIcon color="primary" fontSize="large"/>
                    </IconButton>
                    <Button variant="contained" startIcon={<ShoppingCartIcon/>} fullWidth size="large">COMPRAR</Button>
                </Box>
            </Box>
        </Box>
    );
}