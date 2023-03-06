import { Box, Button, TextField, Typography } from "@mui/material";

export function SearchCepMobile() {

    return (
        <Box width='100%' height='100px' display='flex' justifyContent='center' alignItems='start' flexDirection='column' gap={1}>
            <Typography variant='subtitle2' color='black' fontWeight='bold'>
                Consultar frete e prazo de entrega
            </Typography>
            <Box display='flex' gap={1} height='60%' width='100%'>
                <Box display='flex' justifyContent='center' alignItems='center' flex={1}>
                    <TextField placeholder="Inserir CEP" fullWidth/>
                </Box>
                <Box display='flex' justifyContent='center' width='20%'>
                    <Button variant="outlined" fullWidth sx={{ fontSize: '1rem' }}>
                        OK
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}
