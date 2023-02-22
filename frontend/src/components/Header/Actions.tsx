import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Badge, BadgeProps, Box, styled } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { ProductsContext } from "../../contexts";

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -3,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}));

export function Actions() {

    const navigate = useNavigate()

    const { productsLiked } = useContext(ProductsContext)
    const { productsInCart } = useContext(ProductsContext)

    return (
        <Box width='auto' height='50%' display='flex' alignItems='center' justifyContent="center" gap={4} >
            <StyledBadge badgeContent={productsLiked.length} color="info">
                <FavoriteIcon color="primary" fontSize="large" sx={{ cursor: "pointer" }} onClick={() => {navigate('/favorite')}}/>
            </StyledBadge>
            <StyledBadge badgeContent={productsInCart.length} color="info">
                <ShoppingCartIcon color="primary" fontSize="large" sx={{ cursor: "pointer" }} onClick={() => {navigate('/cart')}}/>
            </StyledBadge>
        </Box>
    );
}
