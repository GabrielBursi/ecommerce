import { Box } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export function Actions() {
    return (
        <Box width='auto' height='50%' display='flex' alignItems='center' justifyContent="center" gap={3} >
            <FavoriteIcon color="primary" sx={{ cursor: "pointer", padding:1 }} />
            <ShoppingCartIcon color="primary" sx={{ cursor: "pointer", padding:1 }} />
        </Box>
    );
}
