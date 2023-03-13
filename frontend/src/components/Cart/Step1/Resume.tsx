import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Divider, Paper, Stack, Typography } from "@mui/material";
import DescriptionIcon from '@mui/icons-material/Description';
import { ProductsContext } from "../../../contexts";

export function Resume() {

    const { productsInCart, frete } = useContext(ProductsContext)
    const [total, setTotal] = useState(0);
    const [some, setSome] = useState(0);

    const navigate = useNavigate()
    
    useEffect(() => {
        const soma = productsInCart.reduce((acumulador, objeto) => acumulador + Number(objeto.price.replace('$ ', '').replace(',','')), 0);
        setSome(soma)
        setTotal(soma + frete)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productsInCart]);

    return (
        <Box component={Paper} elevation={2} width='25%' height='70%' padding={2} display='flex' flexDirection='column' gap={2}>
            <Box display='flex' alignItems='center' gap={1} height='auto'>
                <DescriptionIcon color="primary" />
                <Typography variant="h5" fontWeight='bold'>
                    RESUMO
                </Typography>
            </Box>
            <Box flex={1} display='flex' flexDirection='column' gap={1}>
                <Box display='flex' justifyContent='space-between' alignItems='center' height='15%' paddingX={2}>
                    <Typography variant="subtitle1">
                        Valor dos Produtos: 
                    </Typography>
                    <Typography variant="h6" fontWeight='bold'>
                        R$ {some.toFixed(2)}
                    </Typography>
                </Box>
                <Divider />
                <Box display='flex' justifyContent='space-between' alignItems='center' height='15%' paddingX={2}>
                    <Typography variant="subtitle1">
                        Frete:
                    </Typography>
                    <Typography variant="h6" fontWeight='bold'>
                        R$ {frete.toFixed(2)}
                    </Typography>
                </Box>
                <Box display='flex' bgcolor='#e5fff1' flexDirection='column' justifyContent='center' alignItems='center' height='100%' paddingX={2}>
                    <Typography variant="subtitle1">
                        Valor Total:
                    </Typography>
                    <Typography variant="h4" fontWeight='bold'>
                        R$ {total.toFixed(2)}
                    </Typography>
                </Box>
            </Box>
            <Box height='30%' display='flex' justifyContent='center' alignItems='center'>
                <Stack spacing={2} width='100%'>
                    <Button variant="contained" fullWidth size="large" sx={{ fontSize: '1.2rem' }} onClick={() => navigate('/cart/identification')}>IR PARA O PAGAMENTO</Button>
                    <Button variant="outlined" fullWidth size="large" sx={{ fontSize: '1.2rem' }} onClick={() => navigate('/')}>CONTINUAR COMPRANDO</Button>
                </Stack>
            </Box>
        </Box>
    );
}