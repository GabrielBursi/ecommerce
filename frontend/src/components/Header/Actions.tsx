import { Badge, BadgeProps, Box, styled } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from "react-router-dom";

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -3,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}));

const cart = [1,2,3]

export function Actions() {

    const navigate = useNavigate()

    return (
        <Box width='auto' height='50%' display='flex' alignItems='center' justifyContent="center" gap={4} >
            <StyledBadge badgeContent={cart.length} color="info">
                <FavoriteIcon color="primary" fontSize="large" sx={{ cursor: "pointer" }} onClick={() => {navigate('/favorite')}}/>
            </StyledBadge>
            <StyledBadge badgeContent={cart.length} color="info">
                <ShoppingCartIcon color="primary" fontSize="large" sx={{ cursor: "pointer" }} onClick={() => {navigate('/cart')}}/>
            </StyledBadge>
        </Box>
    );
}
