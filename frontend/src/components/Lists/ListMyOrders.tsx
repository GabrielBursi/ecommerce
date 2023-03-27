import { Box, Paper, Typography } from "@mui/material"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

interface ListMyOrdersProps {
    number: string,
    status: boolean,
    date: string,
    payment: string,
}

export const ListMyOrders = ({ date, number, payment, status }: ListMyOrdersProps) => {
    return (
        <Box component={Paper} display='flex' alignItems='center' width='100%' height={'150px'} padding={2} gap={1} elevation={2}>
            <Box width='18%' height='100%' display='flex' alignItems='start' justifyContent='center' flexDirection='column' gap={3}>
                <Typography variant="h6" fontWeight='bold'>
                    NÚMERO DO PEDIDO
                </Typography>
                <Typography variant="subtitle1">
                    {number}
                </Typography>
            </Box>
            <Box width='18%' height='100%' display='flex' alignItems='start' justifyContent='center' flexDirection='column' gap={3}>
                <Typography variant="h6" fontWeight='bold'>
                    STATUS
                </Typography>
                <Typography variant="subtitle1" color={status ? 'green' : 'error'} fontWeight='bold'>
                    {status ? 'Concluído' : 'Cancelado'}
                </Typography>
            </Box>
            <Box width='18%' height='100%' display='flex' alignItems='start' justifyContent='center' flexDirection='column' gap={3}>
                <Typography variant="h6" fontWeight='bold'>
                    DATA
                </Typography>
                <Typography variant="subtitle1">
                    {date}
                </Typography>
            </Box>
            <Box width='18%' height='100%' display='flex' alignItems='start' justifyContent='center' flexDirection='column' gap={3}>
                <Typography variant="h6" fontWeight='bold'>
                    PAGAMENTO
                </Typography>
                <Typography variant="subtitle1" color='primary' fontWeight='bold'>
                    {payment}
                </Typography>
            </Box>
            <Box flex={1} height='auto' display='flex' alignItems='center' justifyContent='center'>
                <Typography color='primary' fontWeight='bold' variant='h5' sx={{cursor: 'pointer'}}>
                    Detalhes do pedido
                </Typography>
                <KeyboardArrowDownIcon color="primary" fontSize="large" sx={{cursor: 'pointer'}}/>
            </Box>
        </Box>
    )
}
