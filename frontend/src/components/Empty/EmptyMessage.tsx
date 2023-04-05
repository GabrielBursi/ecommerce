import { Box, Button, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"

interface EmptyMessageProps {
    alert: string
}

export const EmptyMessage = ({ alert }: EmptyMessageProps) => {

    const navigate = useNavigate()

    return (
        <Box display='flex' justifyContent='center' alignItems='center' width='100%' height='50%' flexDirection='column' gap={3}>
            <Box display='flex' justifyContent='center' alignItems='center' flexDirection='column'>
                <Typography variant="h4" fontWeight='bold'>
                    Você não tem nenhum {alert}.
                </Typography>
                <Typography variant="subtitle1" fontWeight='light'>
                    Deseja olhar nossos produtos ?
                </Typography>
            </Box>
            <Button variant="contained" size="large" sx={{ fontSize: '1.5rem' }} onClick={() => navigate('/')}>
                continuar navegando
            </Button>
        </Box>
    )
}
