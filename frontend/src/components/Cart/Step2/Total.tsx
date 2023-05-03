import { useContext } from 'react';
import { Box, Typography } from '@mui/material';
import { ShoppingContext } from '../../../contexts';

export function Total() {

    const { userShop } = useContext(ShoppingContext)

    return (
        <Box height='25%' display='flex' flexDirection='column' alignItems='center' justifyContent='center'>
            <Typography variant="subtitle1" color='black' fontWeight='medium'>
                Total do pedido:
            </Typography>
            <Typography color='primary' fontWeight='bold' variant="h3">
                {userShop?.cart.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </Typography>
        </Box>
    );
}
