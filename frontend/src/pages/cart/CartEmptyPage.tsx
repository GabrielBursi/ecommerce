import { Box, Button, Typography } from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { LayoutBase } from "../../layouts";
import { useNavigate } from "react-router-dom";

export function CartEmptyPage() {

    const navigate = useNavigate()

    return (
        <LayoutBase showUserInfo>
            <Box display='flex' justifyContent='center' alignItems='center' width='100%' height='50%' flexDirection='column' gap={3}>
                <Box display='flex' justifyContent='center' alignItems='center' flexDirection='column'>
                    <Typography variant="h4" fontWeight='bold'>
                        O seu carrinho está vazio.
                    </Typography>
                    <Typography variant="subtitle1" fontWeight='light'>
                        Deseja olhar outros produtos similares?
                    </Typography>
                </Box>
                <Button variant="contained" size="large" sx={{fontSize: '1.5rem'}} startIcon={<ShoppingCartIcon/>} onClick={() => navigate('/')}>
                    continuar comprando
                </Button>
            </Box>
        </LayoutBase>
    );
}
