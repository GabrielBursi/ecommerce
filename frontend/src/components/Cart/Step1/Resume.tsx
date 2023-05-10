import { useContext, useEffect, useState } from "react";
import { useMatch, useNavigate } from "react-router-dom";
import { Box, Button, CircularProgress, Divider, Paper, Skeleton, Stack, Typography } from "@mui/material";
import DescriptionIcon from '@mui/icons-material/Description';
import ReCAPTCHA from "react-google-recaptcha";
import { ProductsContext, ResumeContext, ShoppingContext } from "../../../contexts";
import { IDelivery, IMyOrders } from "../../../types";

export function Resume() {

    const { userShop } = useContext(ShoppingContext)
    const { payment, setOrderNumber, deliveryOptions, isLoadingGetDeliveryOptions, isLoadingSelectDeliveryOptions } = useContext(ResumeContext)
    const { purchase, isLoadingPurchase, isLoadingQuantProduct } = useContext(ProductsContext)

    const [reCaptcha, setReCaptcha] = useState(true);
    const [optionSelected, setOptionSelected] = useState<IDelivery>();

    const navigate = useNavigate()

    const match = useMatch('/cart/identification/payment/confirm')
    const isConfirmationPage = match?.pathname === '/cart/identification/payment/confirm'

    useEffect(() => {
        const selected = deliveryOptions?.find(opt => opt.selected === true)
        setOptionSelected(selected)
    }, [deliveryOptions]);

    async function finishPurchase() {

        const orderNumber = Math.floor(Math.random() * 999999)

        const newOrder: Pick<IMyOrders, 'info'> = {
            info: {
                date: new Date(Date.now()).toISOString(),
                number: `#${orderNumber}`,
                payment: payment.toUpperCase(),
                status: true,
            }
        }

        setOrderNumber(orderNumber);
        await purchase(newOrder)
        navigate('/cart/identification/payment/confirm/done')
    }

    return (
        <Box component={Paper} elevation={2} width='25%' height='80%' padding={2} display='flex' flexDirection='column' gap={2}>
            <Box display='flex' alignItems='center' gap={1} height='auto'>
                <DescriptionIcon color="primary" />
                <Typography variant="h5" fontWeight='bold'>
                    RESUMO
                </Typography>
            </Box>
            <Box flex={1} display='flex' flexDirection='column' gap={1}>
                {isLoadingQuantProduct ? 
                    <Skeleton variant="rectangular" width={'100%'} height={35} />
                    :
                    <Box display='flex' justifyContent='space-between' alignItems='center' height='15%' paddingX={2}>
                        <Typography variant="subtitle1">
                            Valor dos Produtos:
                        </Typography>
                        <Typography variant="h6" fontWeight='bold'>
                            {((userShop?.cart.total || 1) - (optionSelected?.price || 1)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        </Typography>
                    </Box>
                }
                <Divider />
                {(isLoadingGetDeliveryOptions || isLoadingSelectDeliveryOptions) ?
                    <Skeleton variant="rectangular" width={'100%'} height={35} />
                    :
                    <Box display='flex' justifyContent='space-between' alignItems='center' height='15%' paddingX={2}>
                        <Typography variant="subtitle1">
                            Frete:
                        </Typography>
                        <Typography variant="h6" fontWeight='bold'>
                            {optionSelected?.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        </Typography>
                    </Box>
                }
                {(isLoadingGetDeliveryOptions || isLoadingSelectDeliveryOptions || isLoadingQuantProduct) ?
                    <Skeleton variant="rectangular" width={'100%'} height={65} />
                    :
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
                            {userShop?.cart.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        </Typography>
                    </Box>
                }
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
                        disabled={isConfirmationPage ? reCaptcha : userShop?.address.length === 0}
                        onClick={async () => isConfirmationPage ? await finishPurchase() : navigate('/cart/identification')}
                    >

                        {!isLoadingPurchase ? isConfirmationPage ? 'FINALIZAR' : 'IR PARA O PAGAMENTO' : <CircularProgress color="primary" sx={{ fontSize: '0.4rem' }} />}
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