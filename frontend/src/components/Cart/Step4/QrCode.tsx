import { Box, Button } from "@mui/material";
import CopyToClipboard from "react-copy-to-clipboard";
import QRCode from "react-qr-code";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'

export function QrCode() {
    return (
        <Box bgcolor='#fafafb' width='50%' display='flex' flexDirection='column' alignItems='center' justifyContent='center' gap={1}>
            <Box width='70%' height='70%'>
                <QRCode value="https://www.linkedin.com/in/gabriel-bursi/" style={{ height: "100%", maxWidth: "100%", width: "100%" }} />
            </Box>
            <CopyToClipboard text="https://www.linkedin.com/in/gabriel-bursi/">
                <Button size="large" sx={{ fontSize: '1rem' }} onClick={() => toast.success("Código pix copiado!", {position: 'top-center'})}>
                    COPIAR CÓDIGO PIX
                </Button>
            </CopyToClipboard>
        </Box>
    );
}