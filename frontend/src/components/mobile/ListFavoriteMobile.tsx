import { memo } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { Box, IconButton, Paper, Rating, Typography } from "@mui/material"
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { id, IProducts } from "../../types";
import { MyImage } from "../Products/MyImage";

interface ListFavoriteMobileProps extends IProducts {
    addProductInCart: (isLogged: boolean, navigate: NavigateFunction, isAlreadyInCart: boolean, product: IProducts, id: id) => void,
    removeProductLiked: () => void,
    isAlreadyInCart: boolean,
    isLogged: boolean
}

function ListFavoriteMobileMemo({ name, img, price, rating, id, addProductInCart, removeProductLiked, isAlreadyInCart, isLogged  }: ListFavoriteMobileProps) {

    const navigate = useNavigate()

    return (
        <Box component={Paper} display="flex" flexDirection="column" width='100%' height="200px" padding={2} gap={1} elevation={2}>
            <Box display='flex' justifyContent='space-between' alignItems='center' width='100%' height='15%'>
                <Rating value={rating} precision={0.5} readOnly max={5} size='small' color="primary" />
                <Box display='flex' justifyContent='end' alignItems='center' height='100%' width='30%' >
                    <IconButton size="medium">
                        <FavoriteIcon color="primary" fontSize="medium" onClick={removeProductLiked} />
                    </IconButton>
                    <IconButton size="medium" >
                        {isAlreadyInCart ?
                            <ShoppingCartCheckoutIcon color="primary" fontSize="medium" onClick={() => navigate('/cart')} />
                            :
                            <AddShoppingCartIcon color="primary" fontSize="medium" onClick={() => {
                                id && addProductInCart(isLogged, navigate, isAlreadyInCart, { img, price, name, rating, id }, id)
                            }} />
                        }
                    </IconButton>
                </Box>
            </Box>
            <Box flex={1} display='flex' alignItems='center' gap={2}>
                <Box display='flex' alignItems='center' justifyContent='center' width='110px' height='110px'>
                    <MyImage alt={name} src={img} height='auto' width='110px' />
                </Box>
                <Box flex={1} display='flex' flexDirection='column' gap={2} height='100%'>
                    <Box width='100%'>
                        <Typography
                            component='h1'
                            variant='body1'
                            sx={{ cursor: 'pointer', wordBreak: 'break-word', display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical" }}
                            color='black'
                            fontWeight="bold"
                            overflow='hidden'
                            textOverflow="ellipsis"
                        >
                            {name}
                        </Typography>
                    </Box>
                    <Box width='100%'>
                        <Typography color='primary' variant='h6' fontWeight='bold'>
                            {price}
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export const ListFavoriteMobile =  memo(ListFavoriteMobileMemo);