import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Card, CardActionArea, CardActions, CardContent, IconButton, Rating, Typography } from "@mui/material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { MyImage } from "../Products/MyImage";
import { IProducts } from "../../types";
import { LoginContext, ProductsContext } from "../../contexts";

interface ProductCardProps extends IProducts {
    seeProduct: () => void,
}

export function ProductCardMobile({ img, price, name, rating, id, seeProduct, }: ProductCardProps) {

    const [hover, setHover] = useState(false);
    const [isFavorite, setIsFavorite] = useState<boolean>(false);
    const [isAlreadyInCart, setIsAlreadyInCart] = useState<boolean>(false);


    const { productsFavorited, productsInCart, addProductInCart, addProductInFavorited, filterProductsAndSetFavoriteOrInCart } = useContext(ProductsContext)
    const { isLogged } = useContext(LoginContext)

    const navigate = useNavigate()


    useEffect(() => {
        filterProductsAndSetFavoriteOrInCart(productsFavorited, id, setIsFavorite)
        filterProductsAndSetFavoriteOrInCart(productsInCart, id, setIsAlreadyInCart)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productsFavorited, productsInCart]);

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
                            addProductInFavorited(isLogged, navigate, setIsFavorite, isFavorite, { img, price, name, rating, id }, id)
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
                                {name}
                            </Typography>
                            <Typography variant="h6" color="primary" fontWeight='bold'>
                                {price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
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
                        id && addProductInCart(isLogged, navigate, isAlreadyInCart, { img, price, name, rating, id }, id)
                    }}
                >
                    {isAlreadyInCart ? 'NO CARRINHO' : 'COMPRAR'}
                </Button>
            </CardActions>
        </Card>
    );
}