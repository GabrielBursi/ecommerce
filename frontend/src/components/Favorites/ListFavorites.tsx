import { useState } from "react";
import { Box, Button, Divider, IconButton, Paper, Rating, Typography, useMediaQuery, useTheme } from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { IProducts } from "../../types";
import { MyImage } from "../Images/MyImage";

export function ListFavorites({ title, img, price, rating }: IProducts) {

    const theme = useTheme()
    const mdDown = useMediaQuery(theme.breakpoints.down('md'))
    const lgDown = useMediaQuery(theme.breakpoints.down('lg'))

    const [color, setColor] = useState(false);

    const brand = title.split(' ')[0]
    const nameWithoutBrand = title.replace(title.split(' ')[0], '')

    return (
        <Box component={Paper} display='flex' alignItems='center' width='100%' height={mdDown ? '185px' : '220px'} padding={2} gap={1} elevation={2}>

            <Box display='flex' alignItems='center' width='60%' height='100%' gap={2}>
                <Box  width='auto' minWidth='20%' height='auto' maxHeight='200px' display='flex' alignItems='center' justifyContent='center'>
                    <MyImage alt={title} src={img} height='auto' width={mdDown ? '110px' : '140px'}/>
                </Box>
                <Box flex={1}  maxWidth='650px' height='100%' display='flex' flexDirection='column' >
                    <Box maxWidth='100%' maxHeight='100%'>
                        <Typography component='span' variant={mdDown ? 'subtitle2' : 'subtitle1'} fontWeight="light">
                            {brand}
                        </Typography>
                        <Typography 
                            component='h1' 
                            variant={ lgDown ? 'body1' : 'h5'} 
                            sx={{ cursor: 'pointer', wordBreak: 'break-word', display: "-webkit-box", WebkitLineClamp: 4, WebkitBoxOrient: "vertical" }} 
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
                    <IconButton size="large">
                        <FavoriteIcon color="primary" fontSize="large"/>
                    </IconButton>
                </Box>
                <Box width='100%' height='100%' display='flex' justifyContent='center' alignItems='center'>
                    <Typography color='primary' variant={mdDown ? 'h4' : 'h3'} fontWeight='bold'>
                        {price}
                    </Typography>
                </Box>
                <Box width='100%' height='100%' display='flex' justifyContent='center' alignItems='center'>
                    <Button  variant="contained" startIcon={<ShoppingCartIcon/>} fullWidth size="large">COMPRAR</Button>
                </Box>
            </Box>
        </Box>
    );
}