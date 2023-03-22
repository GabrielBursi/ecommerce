import { useNavigate } from "react-router-dom";
import { Box, Button } from "@mui/material";

interface ButtonProps {
    payment: string,
    formRef: React.MutableRefObject<HTMLFormElement | undefined>
}

export function Buttons({payment, formRef}: ButtonProps) {

    const navigate = useNavigate()

    function handlePayment(){
        if(payment === 'cartão'){
            return formRef.current?.requestSubmit()
        }

        navigate('/cart/identification/payment/confirm')
    }

    return (
        <Box width='100%' height='10%' display='flex' alignItems='center' justifyContent='end'>
            <Box width='50%' height='100%' display='flex' alignItems='center' gap={2}>
                <Button variant="outlined" size="large" fullWidth sx={{ fontSize: '1.2rem' }} onClick={() => navigate('/cart')}>voltar</Button>
                <Button variant="contained" size="large" fullWidth sx={{ fontSize: '1.2rem' }} onClick={handlePayment}>pagar com {payment}</Button>
            </Box>
        </Box>
    );
}
