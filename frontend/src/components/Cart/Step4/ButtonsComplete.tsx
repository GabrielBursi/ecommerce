import { Box, Button } from "@mui/material"
import { useNavigate } from "react-router-dom"

export const ButtonsComplete = () => {

    const navigate = useNavigate()

    return (
        <Box width='50%' display='flex' gap={2}>
            <Button fullWidth size="large" sx={{fontSize: '1.2rem'}} variant="outlined" onClick={() => navigate('/my-requests')}>
                VER MEUS PEDIDOS
            </Button>
            <Button fullWidth size="large" sx={{fontSize: '1.2rem'}} variant="contained" onClick={() => navigate('/')}>
                CONTINUAR NAVEGANDO
            </Button>
        </Box>
    )
}
