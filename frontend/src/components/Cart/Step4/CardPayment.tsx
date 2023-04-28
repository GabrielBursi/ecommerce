import { Box } from "@mui/material";
import { CardInfo } from "./CardInfo";
import { NumberComponent } from "./Number";

export function CardPayment() {
    return (
        <Box width='50%' height='50%' display='flex' gap={2}>
            <CardInfo/>
            <NumberComponent/>
        </Box>
    );
}
