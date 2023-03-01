import { memo, useState } from "react";
import { NavigateFunction } from "react-router-dom";
import { Box, Button, Card, CardActionArea, CardActions, CardContent, IconButton, Rating, Typography } from "@mui/material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { MyImage } from "../Products/MyImage";
import { id, IProducts } from "../../types";

interface ProductCardProps extends IProducts {
    width?: number | string,
    height?: number | string,
    mdDown?: boolean,
    addProductInLiked: (isLogged: boolean, navigate: NavigateFunction, setIsFavorite: React.Dispatch<React.SetStateAction<boolean>>, isFavorite: boolean, product: IProducts, id: id) => void,
    addProductInCart: (isLogged: boolean, navigate: NavigateFunction, isAlreadyInCart: boolean, product: IProducts, id: id) => void,
    seeProduct: () => void,
    isFavorite: boolean,
    isAlreadyInCart: boolean,
    isLogged: boolean,
    setIsFavorite: React.Dispatch<React.SetStateAction<boolean>>,
    navigate: NavigateFunction
}

function ProductCardMobileMemo(
    { 
        img, 
        price, 
        title, 
        rating, 
        id, 
        addProductInCart, 
        addProductInLiked, 
        seeProduct, 
        isAlreadyInCart, 
        isFavorite, 
        isLogged, 
        setIsFavorite, 
        navigate 
    }: ProductCardProps
) {

    const [hover, setHover] = useState(false);

    return (
        <Card sx={{ width: 290, height: 220 }} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} elevation={hover ? 10 : 2}>
            <CardActionArea>
                <Box
                    sx={{
                        width: '100%',
                        height: '40px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingX: 2
                    }}
                >
                    <Rating value={rating} precision={0.5} readOnly max={5} size='small' color="primary" />
                    <IconButton size="small" onClick={() => {
                            addProductInLiked(isLogged, navigate, setIsFavorite, isFavorite, { img, price, title, rating, id }, id)
                        }}>
                        <FavoriteIcon color={isFavorite ? "primary" : "inherit"} fontSize="small" />
                    </IconButton>
                </Box>
                <Box  onClick={seeProduct}>
                    <CardContent
                        sx={{
                            paddingY: 0,
                            height: "130px",
                            display: 'flex',
                            gap: 1
                        }}
                    >
                        <Box
                            sx={{
                                width: '110px',
                                height: '100%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <MyImage alt="123" src={img} width='90px' height='auto' />
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            <Typography
                                variant="subtitle2"
                                color="black"
                                overflow='hidden'
                                textOverflow='ellipsis'
                                fontWeight='bold'
                                sx={{ wordBreak: 'break-word', display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical" }}
                            >
                                {title}
                            </Typography>
                            <Typography variant="h6" color="primary" fontWeight='bold'>
                                {price}
                            </Typography>
                        </Box>
                    </CardContent>
                </Box>
            </CardActionArea>
            <CardActions disableSpacing>
                <Button
                    variant="contained"
                    startIcon={isAlreadyInCart ? <ShoppingCartCheckoutIcon /> : <AddShoppingCartIcon />}
                    fullWidth
                    size="medium"
                    onClick={() => {
                        id && addProductInCart(isLogged, navigate, isAlreadyInCart, { img, price, title, rating, id }, id)
                    }}
                >
                    {isAlreadyInCart ? 'NO CARRINHO' : 'COMPRAR'}
                </Button>
            </CardActions>
        </Card>
    );
}

export const ProductCardMobile = memo(ProductCardMobileMemo)