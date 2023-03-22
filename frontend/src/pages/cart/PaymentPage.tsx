import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { Box, Paper, Typography } from "@mui/material";
import PaidIcon from '@mui/icons-material/Paid';
import { Buttons, FormCard, OptionPaymentList, PixInfo, Steps } from "../../components";
import { LayoutBase } from "../../layouts";

export function PaymentPage() {

    const [searchParams, setSearchParams] = useSearchParams()

    const payment = searchParams.get('payment') || ''

    const formRef = useRef<HTMLFormElement>()

    useEffect(() => {
        setSearchParams({payment: 'pix'})
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <LayoutBase showUserInfo>
            <Box display='flex' justifyContent='center' alignItems='center' width='100%' height='100%'>
                <Box display='flex' flexDirection='column' width='75%' height='100%' alignItems='center' paddingY={2} gap={2}>
                    <Steps/>
                    <Box width='100%' height='auto' display='flex' flexDirection='column' component={Paper} elevation={2} padding={2} gap={2}>
                        <Box display='flex' alignItems='center' gap={1} height='auto'>
                            <PaidIcon color="primary" />
                            <Typography variant="h5" fontWeight='bold'>
                                FORMA DE PAGAMENTO
                            </Typography>
                        </Box>
                        <Box width='100%' height='100%' display='flex' gap={2}>
                            <OptionPaymentList payment={payment}/>
                            {payment !== 'pix' ? 
                                <FormCard formRef={formRef as React.LegacyRef<HTMLFormElement> | undefined}/>
                                : 
                                <PixInfo/>
                            }
                        </Box>
                    </Box>
                    <Buttons payment={payment} formRef={formRef}/>
                </Box>
            </Box>
        </LayoutBase>
    );
}