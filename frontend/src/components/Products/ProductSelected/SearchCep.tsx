import { Box, Button, TextField, Typography } from "@mui/material";

export function SearchCep() {
    return (
        <Box width='100%' height='150px' display='flex' justifyContent='center' alignItems='start' flexDirection='column' gap={1}>
            <Typography variant="subtitle1" color='black' fontWeight='bold'>
                Consultar frete e prazo de entrega
            </Typography>
            <Box display='flex' gap={1} height='40%'>
                <TextField placeholder="Inserir CEP" />
                <Button variant="outlined" sx={{ fontSize: '1.2rem' }}>
                    OK
                </Button>
            </Box>
        </Box>
    );
}
