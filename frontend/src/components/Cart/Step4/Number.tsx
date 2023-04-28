import { useContext } from "react";
import { Box, Typography } from "@mui/material";
import { ResumeContext } from "../../../contexts";

export function NumberComponent() {

    const { orderNumber } = useContext(ResumeContext)

    return (
        <Box bgcolor='#fafafb' width='50%' display='flex' flexDirection='column' alignItems='center' justifyContent='center'>
            <Typography variant="subtitle1">
                O número do seu pedido é:
            </Typography>
            <Typography variant="h4" fontWeight='bold'>
                {orderNumber && `#${orderNumber}`}
            </Typography>
        </Box>
    );
}