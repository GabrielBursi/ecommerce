import { useState } from "react";
import { Alert, Box, Divider, Paper, Typography, useMediaQuery, useTheme } from "@mui/material";
import { MyImage } from "./MyImage";
import { IProducts } from "../../types";

export function PreCartInfo({ img, price, title }: IProducts) {

    const theme = useTheme()
    const lgDown = useMediaQuery(theme.breakpoints.down('lg'))
    const mdDown = useMediaQuery(theme.breakpoints.down('md'))

    const [color, setColor] = useState(false);

    const brand = title.split(' ')[0]
    const nameWithoutBrand = title.replace(title.split(' ')[0], '')

    return (
        <Box height='100%' display='flex' flexDirection='column' padding={2} component={Paper}>
            <Box height='100%' display='flex' alignItems='center' gap={2}>
                <Box display='flex' alignItems='center' justifyContent='center' width='20%' height='100%'>
                    <MyImage alt={title} src={img} height='auto' width={mdDown ? '110px' : '140px'} />
                </Box>
                <Box display='flex' flexDirection='column' alignItems='start' justifyContent='center' width='50%' height='100%'>
                    <Typography component='span' variant={mdDown ? 'subtitle2' : 'subtitle1'} fontWeight="light">
                        {brand}
                    </Typography>
                    <Typography
                        component='h1'
                        variant={lgDown ? 'h6' : 'h5'}
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
                    <Typography color='primary' variant={mdDown ? 'h4' : 'h3'} fontWeight='bold'>
                        {price}
                    </Typography>
                </Box>
            </Box>
            <Box width='100%' display='flex' justifyContent='center' alignItems='center'>
                <Alert variant="filled" severity="success">
                    PRODUTO ADICIONADO NO CARRINHO
                </Alert>
            </Box>
        </Box>
    );
}