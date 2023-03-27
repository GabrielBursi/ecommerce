import { useContext, useEffect } from "react";

import { Box, Typography } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import { ButtonsComplete, CardPayment, PixPayment, Steps } from "../../components";
import { LayoutBase } from "../../layouts";
import { ProductsContext, ResumeContext } from "../../contexts";

export function DonePage() {

    const { payment } = useContext(ResumeContext)
    const { setMyOrders, myOrders } = useContext(ProductsContext)

    useEffect(() => {
        setMyOrders([...myOrders, { 
            date: new Date(Date.now()).toLocaleString().split(',')[0], 
            number: `#${Math.floor(Math.random() * 999999) }`,
            payment: payment.toUpperCase(),
            status: true
        }])
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <LayoutBase showUserInfo>
            <Box display='flex' justifyContent='center' alignItems='center' width='100%' height='100%'>
                <Box display='flex' flexDirection='column' width='75%' height='100%' alignItems='center' paddingY={2} gap={2}>
                    <Steps/>
                    <Box width='100%' height='100%' display='flex' flexDirection='column' alignItems='center' gap={4}>
                        <Box display='flex' alignItems='center' gap={1} height='auto'>
                            <CheckCircleIcon color="success" sx={{fontSize: '2.3rem'}}/>
                            <Typography variant="h4" fontWeight='bold' color='green'>
                                PEDIDO REALIZADO COM SUCESSO!
                            </Typography>
                        </Box>
                        { payment === 'pix' ?
                            <PixPayment/>
                            :
                            <CardPayment/>
                        }
                        <ButtonsComplete/>
                    </Box>
                </Box>
            </Box>
        </LayoutBase>
    );
}