import { Box, Paper, Typography } from "@mui/material";
import LocationOnIcon from '@mui/icons-material/LocationOn';

export function Address() {
    return (
        <Box height='40%' component={Paper} elevation={2} padding={3} display='flex' flexDirection='column' gap={2}>
            <Box display='flex' alignItems='center' gap={1} height='auto'>
                <LocationOnIcon color="primary"/>
                <Typography variant="h5" fontWeight='bold'>
                    SELECIONE O ENDEREÇO
                </Typography>
            </Box>
        </Box>
    );
}
