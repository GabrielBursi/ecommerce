import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardHeader, IconButton, Rating, Typography } from "@mui/material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { MyImage } from "./MyImage";
import { IProducts } from "../../types";
import { LoginContext, ProductsContext } from "../../contexts";
import { ProductCardMobile } from "../mobile";

interface ProductCardProps extends IProducts{
    width?: number | string,
    height?: number | string,
    mdDown?: boolean
}

export function ProductCard({ img, price, name, rating, width = 270, height = 390, uuid, mdDown }: ProductCardProps) {

    const [hover, setHover] = useState<boolean>(false);
    const [isFavorite, setIsFavorite] = useState<boolean>(false);
    const [isAlreadyInCart, setIsAlreadyInCart] = useState<boolean>(false);


    const { productsFavorited, productsInCart, addProductInCart, addProductInFavorited, filterProductsAndSetFavoriteOrInCart } = useContext(ProductsContext)
    const { isLogged } = useContext(LoginContext)

    const navigate = useNavigate()

    useEffect(() => {
        filterProductsAndSetFavoriteOrInCart(productsFavorited, uuid, setIsFavorite)
        filterProductsAndSetFavoriteOrInCart(productsInCart, uuid, setIsAlreadyInCart)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productsFavorited, productsInCart]);

    function seeProduct(){
        navigate(`/product/${uuid}`)
    }

    if(mdDown)
    return <ProductCardMobile
                img={img}
                price={price}
                name={name}
                uuid={uuid}
                rating={rating}
                seeProduct={seeProduct}
            />

    return (
        <Card sx={{ width: width, height: height }} elevation={hover ? 10 : 2} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
            <CardActionArea>
                <Box
                    sx={{
                        width:'100%',
                        height:'50px',
                        display:'flex',
                        justifyContent:'end',
                        alignItems:'center'
                    }}
                >
                    <CardHeader 
                        action={
                            hover ? 
                            <IconButton size="medium" onClick={ () => {
                                    addProductInFavorited(isLogged, navigate, setIsFavorite, isFavorite, { img, price, name, rating, uuid }, uuid)
                                }}>
                                <FavoriteIcon color={isFavorite ? "primary" : "inherit"} fontSize="medium" />
                            </IconButton>
                            :
                            <Rating value={rating} precision={0.5} readOnly max={5} size='medium' color="primary" />
                        }
                    />
                </Box>
                <Box
                    onClick={seeProduct}
                    sx={{
                        width: '100%', 
                        height:'160px',
                        display:'flex',
                        justifyContent:'center',
                        alignItems:'center'
                    }}
                >
                    <MyImage alt="123" src={img} width='110px' height='auto'/>
                </Box>
                <CardContent sx={{ paddingY: 0, height: 90 }} onClick={seeProduct}>
                    <Typography 
                        variant="body1" 
                        color="black" 
                        overflow='hidden' 
                        textOverflow='ellipsis'
                        fontWeight='bold' 
                        sx={{wordBreak: 'break-word', display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical" }}
                    >
                        {name}
                    </Typography>
                </CardContent>
                <CardContent sx={{paddingY: 0}} onClick={seeProduct}>
                    <Typography variant="h5" color="primary" fontWeight='bold'>
                        {price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </Typography>
                </CardContent>
            <CardActions disableSpacing>
                <Button
                    variant="contained"
                    startIcon={isAlreadyInCart ? <ShoppingCartCheckoutIcon /> : <AddShoppingCartIcon />}
                    fullWidth
                    size="large"
                    onClick={() => {
                        uuid && addProductInCart(isLogged, navigate, isAlreadyInCart, { img, price, name, rating, uuid }, uuid)
                    }}
                    >
                    {isAlreadyInCart ? 'NO CARRINHO' : 'COMPRAR'}
                </Button>
            </CardActions>
            </CardActionArea>
        </Card>
    );
}   