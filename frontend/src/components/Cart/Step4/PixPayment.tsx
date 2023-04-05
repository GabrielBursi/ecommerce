import { Box } from "@mui/material";
import { Number } from "./Number";
import { QrCode } from "./QrCode";

export function PixPayment() {
    return (
        <Box width='50%' height='50%' display='flex' gap={2}>
            <QrCode/>
            <Number/>
        </Box>
    );
}
