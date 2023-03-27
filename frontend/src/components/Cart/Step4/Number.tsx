import { Box, Typography } from "@mui/material";

export function Number() {

    const number = (Math.floor(Math.random() * 999999));

    return (
        <Box bgcolor='#fafafb' width='50%' display='flex' flexDirection='column' alignItems='center' justifyContent='center'>
            <Typography variant="subtitle1">
                O número do seu pedido é:
            </Typography>
            <Typography variant="h4" fontWeight='bold'>
                {number}
            </Typography>
        </Box>
    );
}