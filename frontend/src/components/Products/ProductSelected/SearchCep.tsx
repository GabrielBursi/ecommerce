import { Box, Button, TextField, Typography, useMediaQuery, useTheme } from "@mui/material";

export function SearchCep() {

    const theme = useTheme()
    const mdDown = useMediaQuery(theme.breakpoints.down('md'))

    return (
        <Box width='100%' height='150px' display='flex' justifyContent='center' alignItems='start' flexDirection='column' gap={1} >
            <Typography variant={mdDown ? "subtitle2" : "subtitle1"} color='black' fontWeight='bold'>
                Consultar frete e prazo de entrega
            </Typography>
            <Box display='flex' gap={1} height='40%'>
                <Box display='flex' justifyContent='center' alignItems='center' flex={1}>
                    <TextField placeholder="Inserir CEP" />
                </Box>
                <Box display='flex' justifyContent='center' width='20%'>
                    <Button variant="outlined" fullWidth sx={{ fontSize: mdDown ? '1rem' : '1.2rem' }}>
                        OK
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}
