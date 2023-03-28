import { useContext, useEffect, useState } from "react";
import { useMatch, useNavigate } from "react-router-dom";
import { Box, Button, Divider, Paper, Stack, Typography } from "@mui/material";
import DescriptionIcon from '@mui/icons-material/Description';
import { AddressContext, ProductsContext, ResumeContext } from "../../../contexts";
import ReCAPTCHA from "react-google-recaptcha";

export function Resume() {

    const { productsInCart } = useContext(ProductsContext)
    const { addressList } = useContext(AddressContext)
    const { frete, setSomeProducts, setTotal, someProducts, total, payment } = useContext(ResumeContext)

    const [reCaptcha, setReCaptcha] = useState(true);

    const navigate = useNavigate()

    const match = useMatch('/cart/identification/payment/confirm')
    const isConfirmationPage = match?.pathname === '/cart/identification/payment/confirm'

    useEffect(() => {
        const soma = productsInCart.reduce((acumulador, product) => { 
            if(typeof product.price === "number"){
                const PricePerQuant = product.price * (product.quant || 1)
                return acumulador + PricePerQuant
            }
            return 0
        }, 0);
        setSomeProducts(soma)
        setTotal(soma + frete)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productsInCart, frete]);

    return (
        <Box component={Paper} elevation={2} width='25%' height='80%' padding={2} display='flex' flexDirection='column' gap={2}>
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
                        {someProducts.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </Typography>
                </Box>
                <Divider />
                <Box display='flex' justifyContent='space-between' alignItems='center' height='15%' paddingX={2}>
                    <Typography variant="subtitle1">
                        Frete:
                    </Typography>
                    <Typography variant="h6" fontWeight='bold'>
                        {frete.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </Typography>
                </Box>
                <Box display='flex' bgcolor='#e5fff1' flexDirection='column' justifyContent='center' alignItems='center' height='100%' paddingX={2}>
                    {isConfirmationPage &&
                        <Typography variant="caption">
                            FORMA DE PAGAMENTO: <b>{payment.toUpperCase()}</b>
                        </Typography>
                    }
                    <Typography variant="subtitle1">
                        Valor Total:
                    </Typography>
                    <Typography variant="h4" fontWeight='bold'>
                        {total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </Typography>
                </Box>
            </Box>
            <Box height='50%' display='flex' flexDirection='column' justifyContent='center' alignItems='center' gap={2}>
                {isConfirmationPage && 
                    <Box height='60%' width='100%' display='flex' justifyContent='center' alignItems='center'>
                        <Button onClick={() => setReCaptcha(!reCaptcha)}>
                            <ReCAPTCHA
                                sitekey={process.env.REACT_APP_SITE_KEY || 'key'}
                                onChange={() => setReCaptcha(!reCaptcha)}
                                badge='bottomleft'
                            />
                        </Button>
                    </Box>
                }
                <Stack spacing={2} width='100%'>
                    <Button 
                        variant="contained" 
                        fullWidth 
                        size="large" 
                        sx={{ fontSize: '1.2rem' }} 
                        disabled={isConfirmationPage ?  reCaptcha : addressList.length === 0} 
                        onClick={() => isConfirmationPage ? navigate('/cart/identification/payment/confirm/done') : navigate('/cart/identification')}
                    >
                        {isConfirmationPage ? 'FINALIZAR' : 'IR PARA O PAGAMENTO'}
                    </Button>
                    <Button 
                        variant="outlined" 
                        fullWidth 
                        size="large" 
                        sx={{ fontSize: '1.2rem' }} 
                        onClick={() => isConfirmationPage ? navigate('/cart/identification/payment') : navigate('/')}
                    >
                        {isConfirmationPage ? 'VOLTAR' : 'CONTINUAR COMPRANDO'}
                    </Button>
                </Stack>
            </Box>
        </Box>
    );
}