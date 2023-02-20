import { useState } from "react";
import { Box, Button, Divider, IconButton, Paper, Rating, Typography, useMediaQuery, useTheme } from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { IProducts } from "../../types";
import { MyImage } from "../Images/MyImage";

export function ListFavorites({ title, img, price, rating, smDown }: IProducts) {

    const theme = useTheme()
    const mdDown = useMediaQuery(theme.breakpoints.down('md'))
    const lgDown = useMediaQuery(theme.breakpoints.down('lg'))

    const [color, setColor] = useState(false);

    const brand = title.split(' ')[0]
    const nameWithoutBrand = title.replace(title.split(' ')[0], '')

    if(smDown) 
    return (
        <Box component={Paper} display="flex" flexDirection="column" width='100%' height="200px" padding={2} gap={1} elevation={2}>
            <Box display='flex' justifyContent='space-between' alignItems='center' width='100%' height='15%'>
                <Rating value={rating} precision={0.5} readOnly max={5} size='small' color="primary"/>
                <Box display='flex' justifyContent='end' alignItems='center' height='100%' width='30%' >
                    <IconButton size="medium">
                        <FavoriteIcon color="primary" fontSize="medium" />
                    </IconButton>
                    <IconButton size="medium">
                        <ShoppingCartIcon color="primary" fontSize="medium" />
                    </IconButton>
                </Box>
            </Box>
            <Box flex={1} display='flex' alignItems='center' gap={2}>
                <Box display='flex' alignItems='center' justifyContent='center' width='110px' height='110px'>
                    <MyImage alt={title} src={img} height='auto' width='110px'/>
                </Box>
                <Box flex={1} display='flex' flexDirection='column' gap={2} height='100%'>
                    <Box width='100%'>
                        <Typography
                            component='h1'
                            variant='body1'
                            sx={{ cursor: 'pointer', wordBreak: 'break-word', display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical" }}
                            onMouseOver={() => setColor(true)}
                            onMouseLeave={() => setColor(false)}
                            color={color ? 'primary' : 'black'}
                            fontWeight="bold"
                            overflow='hidden'
                            textOverflow="ellipsis"
                        >
                            {title}
                        </Typography>
                    </Box>
                    <Box width='100%'>
                        <Typography color='primary' variant='h6' fontWeight='bold'>
                            {price}
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    )

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