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

export function ProductCard({ img, price, title, rating, width = 270, height = 400, id, mdDown }: ProductCardProps) {

    const [hover, setHover] = useState<boolean>(false);
    const [isFavorite, setIsFavorite] = useState<boolean>(false);
    const [isAlreadyInCart, setIsAlreadyInCart] = useState<boolean>(false);


    const { setProductsLiked, productsLiked, setProductsInCart, productsInCart } = useContext(ProductsContext)
    const { isLogged } = useContext(LoginContext)

    const navigate = useNavigate()

    useEffect(() => {
        const productLiked = productsLiked.filter(product => product.id === id)
        productLiked.forEach(() => {
            setIsFavorite(true)
        })
        const productLikedInCart = productsInCart.filter(product => product.id === id)
        productLikedInCart.forEach(() => {
            setIsAlreadyInCart(true)
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productsLiked, productsInCart]);

    function addProductInCart(id: number | string){
        if (!isLogged)
        return navigate('/login')

        if (isAlreadyInCart) return navigate('/cart')
        setProductsInCart([...productsInCart, { img, price, title, rating, id }])
        navigate(`/precart/${id}`)
    }

    function addProductInLiked(){

        if (!isLogged)
        return navigate('/login')

        setIsFavorite(oldIsFavorite => !oldIsFavorite)
        if(!isFavorite){
            setProductsLiked([...productsLiked, {img, price, title, rating, id}])
        }else{
            const productsLikedWithout = productsLiked.filter(product => product.id !== id)
            setProductsLiked(productsLikedWithout)
        }
    }

    function seeProduct(){
        navigate(`/product/${id}`)
    }

    if(mdDown)
    return <ProductCardMobile
                img={img}
                price={price}
                title={title}
                id={id}
                rating={rating}
                addProductInCart={addProductInCart}
                addProductInLiked={addProductInLiked}
                seeProduct={seeProduct}
                isAlreadyInCart={isAlreadyInCart}
                isFavorite={isFavorite}
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
                            <IconButton size="small" onClick={addProductInLiked}>
                                <FavoriteIcon color={isFavorite ? "primary" : "inherit"} fontSize="small" />
                            </IconButton>
                            :
                            <Rating value={rating} precision={0.5} readOnly max={5} size='small' color="primary" />
                        }
                    />
                </Box>
                <Box onClick={seeProduct}>
                    <Box 
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
                    <CardContent sx={{ paddingY: 0, height: 90 }}>
                        <Typography 
                            variant="body1" 
                            color="black" 
                            overflow='hidden' 
                            textOverflow='ellipsis'
                            fontWeight='bold' 
                            sx={{wordBreak: 'break-word', display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical" }}
                        >
                            {title}
                        </Typography>
                    </CardContent>
                    <CardContent sx={{paddingY: 0}}>
                        <Typography variant="h5" color="primary" fontWeight='bold'>
                            {price}
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <Button
                            variant="contained"
                            startIcon={isAlreadyInCart ? <ShoppingCartCheckoutIcon /> : <AddShoppingCartIcon />}
                            fullWidth
                            size="large"
                            onClick={() => { id && addProductInCart(id) }}
                            >
                            {isAlreadyInCart ? 'IR AO CARRINHO' : 'COMPRAR'}
                        </Button>
                    </CardActions>
                </Box>
            </CardActionArea>
        </Card>
    );
}   