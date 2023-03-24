import { Box, Typography } from "@mui/material";
import { useState } from "react";

export function Number() {

    const [number, setNumber] = useState(Math.floor(Math.random() * 999999));

    return (
        <Box bgcolor='#fafafb' width='50%' display='flex' flexDirection='column' alignItems='center' justifyContent='center'>
            <Typography variant="subtitle1">
                O número do seu pedido é:
            </Typography>
            <Typography variant="h4" fontWeight='bold' onClick={() => setNumber(Math.floor(Math.random() * 999999))}>
                {number}
            </Typography>
        </Box>
    );
}