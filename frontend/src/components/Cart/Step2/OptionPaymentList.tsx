import { useContext } from "react";
import { useSearchParams } from "react-router-dom";
import { Box, Button } from "@mui/material";
import PixIcon from '@mui/icons-material/Pix';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import { Total } from "./Total";
import { ResumeContext } from "../../../contexts";

interface OptionPaymentListProps {
    payment: string;
}

export function OptionPaymentList({payment}: OptionPaymentListProps) {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, setSearchParams] = useSearchParams()

    const { setPayment } = useContext(ResumeContext)

    return (
        <Box width='25%' display='flex' flexDirection='column' gap={2}>
            <Box flex={1} display='flex' flexDirection='column' gap={2}>
                <Button
                    variant={payment === 'pix' ? "contained" : 'outlined'} 
                    fullWidth 
                    size="large" 
                    startIcon={<PixIcon />} 
                    sx={{ fontSize: '1.2rem', display: 'flex', justifyContent: 'start' }}
                    onClick={() => {
                        setSearchParams({payment: 'pix'})
                        setPayment('pix')
                    }}
                >
                    PIX
                </Button>
                <Button
                    variant={payment === 'cartão' ? "contained" : 'outlined'} 
                    fullWidth 
                    size="large" 
                    startIcon={<CreditCardIcon />} 
                    sx={{ fontSize: '1.2rem', display: 'flex', justifyContent: 'start' }}
                    onClick={() => {
                        setSearchParams({payment: 'cartão'})
                        setPayment('cartão')
                    }}
                >
                    CARTÃO DE CRÉDITO
                </Button>
            </Box>
            <Total/>
        </Box>
    )
}
