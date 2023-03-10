import { Box, Button, Divider, Paper, Stack, Typography } from "@mui/material";
import DescriptionIcon from '@mui/icons-material/Description';


export function Resume() {
    return (
        <Box component={Paper} elevation={2} width='25%' height='70%' padding={2} display='flex' flexDirection='column' gap={2}>
            <Box display='flex' alignItems='center' gap={1} height='auto'>
                <DescriptionIcon color="primary" />
                <Typography variant="h5" fontWeight='bold'>
                    RESUMO
                </Typography>
            </Box>
            <Box flex={1} display='flex' flexDirection='column' gap={1}>
                <Box display='flex' justifyContent='space-between' alignItems='center' height='15%' paddingX={2}>
                    <Typography variant="subtitle1">
                        Valor dos Produtos:
                    </Typography>
                    <Typography variant="h6" fontWeight='bold'>
                        teste
                    </Typography>
                </Box>
                <Divider />
                <Box display='flex' justifyContent='space-between' alignItems='center' height='15%' paddingX={2}>
                    <Typography variant="subtitle1">
                        Frete:
                    </Typography>
                    <Typography variant="h6" fontWeight='bold'>
                        teste
                    </Typography>
                </Box>
                <Box display='flex' bgcolor='#e5fff1' flexDirection='column' justifyContent='center' alignItems='center' height='100%' paddingX={2}>
                    <Typography variant="subtitle1">
                        Valor Total:
                    </Typography>
                    <Typography variant="h4" fontWeight='bold'>
                        teste
                    </Typography>
                </Box>
            </Box>
            <Box height='30%' display='flex' justifyContent='center' alignItems='center'>
                <Stack spacing={2} width='100%'>
                    <Button variant="contained" fullWidth size="large" sx={{ fontSize: '1.2rem' }}>IR PARA O PAGAMENTO</Button>
                    <Button variant="outlined" fullWidth size="large" sx={{ fontSize: '1.2rem' }}>CONTINUAR COMPRANDO</Button>
                </Stack>
            </Box>
        </Box>
    );
}