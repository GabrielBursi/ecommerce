import { useEffect, useState } from "react";
import { Alert, Box, Paper, Snackbar, Typography } from "@mui/material";
import { MyImage } from "../Products/MyImage";
import { IProducts } from "../../types";

interface PreCartInfoMobileProps extends IProducts {
    brand: string,
    nameWithoutBrand: string
}

export function PreCartInfoMobile({ img, price, name, uuid, brand, nameWithoutBrand }: PreCartInfoMobileProps) {

    const [open, setOpen] = useState(false);

    useEffect(() => {
        setOpen(true)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [uuid]);

    return (
        <Box height='100%' width='100%' display='flex' flexDirection='column' padding={2} component={Paper} elevation={10}>
            <Box height='70%' display='flex' alignItems='center' gap={2}>
                <Box display='flex' alignItems='center' justifyContent='center' width='30%' height='100%'>
                    <MyImage alt={name} src={img} height='auto' width='100px' />
                </Box>
                <Box display='flex' flexDirection='column' alignItems='start' justifyContent='start' flex={1} height='100%'>
                    <Typography component='span' variant='body2' fontWeight="light">
                        {brand}
                    </Typography>
                    <Typography
                        component='h1'
                        variant='subtitle2'
                        sx={{ cursor: 'pointer', wordBreak: 'break-word', display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical" }}
                        color='black'
                        fontWeight="bold"
                        overflow='hidden'
                        textOverflow="ellipsis"
                    >
                        {nameWithoutBrand}
                    </Typography>
                </Box>
            </Box>
            <Box flex={1} display='flex' alignItems='center' justifyContent='center'>
                <Typography color='primary' variant='h4' fontWeight='bold'>
                    {price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </Typography>
            </Box>
            <Snackbar
                open={open}
                autoHideDuration={4000}
                onClose={() => setOpen(false)}
                sx={{
                    mb: 4.5
                }}
            >
                <Alert severity="success" variant="filled" sx={{ width: '100%', display: 'flex' }} onClick={() => setOpen(false)}>
                    Produto adicionado ao carrinho! 
                    <Typography variant="body2" fontWeight='light'>Toque para fechar.</Typography>
                </Alert>
            </Snackbar>
        </Box>
    );
}