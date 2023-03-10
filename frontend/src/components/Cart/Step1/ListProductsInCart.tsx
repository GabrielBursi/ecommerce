import { Box, Paper, Typography } from "@mui/material";
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';

export function ListProductsInCart() {
    return (
        <Box flex={1} component={Paper} elevation={2} padding={2} display='flex' flexDirection='column' gap={2}>
            <Box display='flex' alignItems='center' gap={1} height='auto'>
                <ShoppingBasketIcon color="primary" />
                <Typography variant="h5" fontWeight='bold'>
                    PRODUTO E FRETE
                </Typography>
            </Box>
        </Box>
    );
}
