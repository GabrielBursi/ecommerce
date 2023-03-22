import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";

export function PixInfo() {
    return (
        <Box flex={1} display='flex' flexDirection='column' gap={2}>
            <Typography variant="h6" fontWeight='bold'>
                Pix
            </Typography>
            <Box width='100%' height='80%'>
                <List>
                    <ListItem disablePadding>
                        <ListItemText primary="Com o seu celular, basta escanear o QR Code ou copiar o código para efetivar a compra;" />
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemText primary="Nessa modalidade, seu pedido é aprovado instantaneamente, o que torna a expedição do seu pedido ainda mais rápida;" />
                    </ListItem>
                </List>
            </Box>
        </Box>
    );
}
