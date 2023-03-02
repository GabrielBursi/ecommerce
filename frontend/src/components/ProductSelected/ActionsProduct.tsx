import { NavigateFunction } from "react-router-dom";
import { Box, Divider, IconButton, Rating, Typography } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import { IProducts, id } from "../../types";

interface ActionsProductProps extends Pick<IProducts, 'name' | 'rating'> {
    addProductInLiked: (isLogged: boolean, navigate: NavigateFunction, setIsFavorite: React.Dispatch<React.SetStateAction<boolean>>, isFavorite: boolean, product: IProducts, id: id) => void,
    isLogged: boolean, 
    navigate: NavigateFunction, 
    isFavorite: boolean, 
    product: IProducts, 
    setIsFavorite: React.Dispatch<React.SetStateAction<boolean>>
}

export function ActionsProduct({ name, rating, addProductInLiked, isFavorite, isLogged, navigate, product, setIsFavorite }: ActionsProductProps) {
    return (
        <Box width='100%' height='10%' display='flex' justifyContent='space-between'>
            <Box width='30%' display='flex' justifyContent='center' alignItems='center'>
                <Typography variant="subtitle1" color='black' fontWeight='bold'>
                    {name.split(' ')[0]}
                </Typography>
            </Box>
            <Divider orientation="vertical" flexItem />
            <Box width='30%' display='flex' justifyContent='center' alignItems='center'>
                <Rating value={rating} precision={0.5} readOnly max={5} size='large' />
            </Box>
            <Divider orientation="vertical" flexItem />
            <Box width='30%' display='flex' justifyContent='center' alignItems='center' gap={2}>
                <IconButton color='primary' size="medium">
                    <ShareIcon sx={{ fontSize: '2rem' }} />
                </IconButton>
                <IconButton size="medium" onClick={() => {
                    addProductInLiked(isLogged, navigate, setIsFavorite, isFavorite, product, product.id)
                }}>
                    <FavoriteIcon sx={{ fontSize: '2rem' }} color={isFavorite ? 'primary' : 'inherit'} />
                </IconButton>
            </Box>
        </Box>
    );
}
