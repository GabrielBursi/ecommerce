import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, CircularProgress, IconButton, Paper, Rating, Typography } from "@mui/material"
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { IProducts } from "../../types";
import { MyImage } from "../Products/MyImage";
import { ProductsContext, ShoppingContext } from "../../contexts";


export function ListFavoriteMobile({ name, img, price, rating, uuid }: IProducts) {

    const { addProductInCart, removeProductFavorited } = useContext(ProductsContext)
    const { userShop } = useContext(ShoppingContext)

    const [isAlreadyInCart, setIsAlreadyInCart] = useState<boolean>(false);
    const [_, setIsFavorite] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate()

    useEffect(() => {
        const productIsInCart = userShop?.cart.products.find(p => p.uuid === uuid)
        if (productIsInCart) {
            setIsAlreadyInCart(true)
        }
        const productIsInFavorites = userShop?.favorites.find(p => p.uuid === uuid)
        if (productIsInFavorites) {
            setIsFavorite(true)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userShop?.favorites, userShop?.cart.products]);

    return (
        <Box component={Paper} display="flex" flexDirection="column" width='100%' height="200px" padding={2} gap={1} elevation={2}>
            <Box display='flex' justifyContent='space-between' alignItems='center' width='100%' height='15%'>
                <Rating value={rating} precision={0.5} readOnly max={5} size='small' color="primary" />
                <Box display='flex' justifyContent='end' alignItems='center' height='100%' width='30%'>
                    <IconButton size="medium">
                        <FavoriteIcon color="primary" fontSize="medium" onClick={async () => await removeProductFavorited(uuid, setIsFavorite)} />
                    </IconButton>
                    <IconButton size="medium" disabled={!isAlreadyInCart && isLoading}>
                        {isLoading ? <CircularProgress color="primary" size={20}/>
                            :
                            isAlreadyInCart ?
                                <ShoppingCartCheckoutIcon color="primary" fontSize="medium" onClick={() => navigate('/cart')} />
                                :
                                <AddShoppingCartIcon color="primary" fontSize="medium" onClick={async () => {
                                    setIsLoading(true)
                                    uuid && await addProductInCart(uuid, isAlreadyInCart)
                                    setIsLoading(false)
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
                            {price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}