import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Divider, Paper, Typography, useMediaQuery, useTheme } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { MyImage } from "./MyImage";
import { IProducts } from "../../types";
import { PreCartInfoMobile } from "../mobile";

export function PreCartInfo({ img, price, name, uuid }: IProducts) {

    const theme = useTheme()
    const mdDown = useMediaQuery(theme.breakpoints.down('md'))
    const lgDown = useMediaQuery(theme.breakpoints.down('lg'))
    const smDown = useMediaQuery(theme.breakpoints.down('sm'))

    const [color, setColor] = useState(false);

    const navigate = useNavigate()

    const brand = name.split(' ')[0]
    const nameWithoutBrand = name.replace(name.split(' ')[0], '')

    if(smDown)
    return <PreCartInfoMobile
                name={name}
                img={img}
                price={price}
                uuid={uuid}
                brand={brand}
                nameWithoutBrand={nameWithoutBrand}
            />

    return (
        <Box height='100%' display='flex' flexDirection='column' padding={2} component={Paper} elevation={10}>
            <Box height='100%' display='flex' alignItems='center' gap={2}>
                <Box display='flex' alignItems='center' justifyContent='center' width='20%' height='100%'>
                    <MyImage alt={name} src={img} height='auto' width={mdDown ? '110px' : '140px'} />
                </Box>
                <Box display='flex' flexDirection='column' alignItems='start' justifyContent='center' width='50%' height='100%'>
                    <Typography component='span' variant='body1' fontWeight="light">
                        {brand}
                    </Typography>
                    <Typography
                        component='h1'
                        variant={ mdDown ? 'subtitle1' : lgDown ? 'h6' : 'h5' }
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
                <Divider orientation="vertical" variant="middle" sx={{ height: '50%' }} />
                <Box display='flex' alignItems='center' justifyContent='center' flex={1} height='100%'>
                    <Typography color='primary' variant={ mdDown ? 'h5' : lgDown ? 'h4' : 'h3' } fontWeight='bold'>
                        {price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </Typography>
                </Box>
            </Box>
            <Box width='100%'display='flex' flexDirection='column' justifyContent='center' alignItems='center' gap={1}>
                <Box width='100%' display='flex' justifyContent='center' alignItems='center'>
                    <Typography color='green' variant="body2" sx={{display:'flex', alignItems:'center'}}>
                        <CheckCircleIcon color="success" />PRODUTO ADICIONADO NO CARRINHO
                    </Typography>
                </Box>
                { !mdDown &&
                    <Box width='100%' display='flex' justifyContent='center' alignItems='center' gap={2}>
                        <Button variant="outlined" size="large" sx={{ fontSize: lgDown ? 15 : 20 }} onClick={() => navigate('/')}>CONTINUAR COMPRANDO</Button>
                        <Button variant="contained" size="large" sx={{fontSize: lgDown ? 15 : 20}} onClick={() => navigate('/cart')}>IR PARA O CARRINHO</Button>
                    </Box>
                }
            </Box>
        </Box>
    );
}