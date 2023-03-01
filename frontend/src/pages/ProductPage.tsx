import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, Divider, IconButton, Paper, Rating, TextField, Typography } from "@mui/material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import SellIcon from '@mui/icons-material/Sell';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import { LayoutBase } from "../layouts";
import { IProducts } from "../types";
import { LoginContext, ProductsContext } from "../contexts";
import { Carousel, MyImage } from "../components";

export function ProductPage() {

    const { id } = useParams<'id'>()
    const navigate= useNavigate()

    const { products, setProductsInCart, productsInCart, setProductsLiked, productsLiked } = useContext(ProductsContext)
    const { isLogged } = useContext(LoginContext)

    const [productInfo, setProductInfo] = useState<IProducts>({ id: '', img: '', price: '', title: ' ', rating: 0 });
    const [isFavorite, setIsFavorite] = useState<boolean>(false);
    const [isAlreadyInCart, setIsAlreadyInCart] = useState<boolean>(false);

    useEffect(() => {
        if(!id){
            return console.log('teste');
        }
        const arrProductSelected = products.filter(product => product.id === id)
        const [productSelected] = arrProductSelected
        setProductInfo(productSelected)

        const productLiked = productsLiked.filter(product => product.id === id)
        productLiked.forEach(() => {
            setIsFavorite(true)
        })
        const productLikedInCart = productsInCart.filter(product => product.id === id)
        productLikedInCart.forEach(() => {
            setIsAlreadyInCart(true)
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, productsLiked, productsInCart]);

    function addProductInCart(id: number | string | undefined) {

        if (!isLogged)
            return navigate('/login')

        setProductsInCart([...productsInCart, { img: productInfo.img, price: productInfo.price, title: productInfo.title, rating: productInfo.rating, id }])
        navigate(`/precart/${id}`)
    }

    function addProductInLiked() {

        if (!isLogged)
            return navigate('/login')

        setIsFavorite(oldIsFavorite => !oldIsFavorite)
        if (!isFavorite) {
            setProductsLiked([...productsLiked, { img: productInfo.img, price: productInfo.price, title: productInfo.title, rating: productInfo.rating, id }])
        } else {
            const productsLikedWithout = productsLiked.filter(product => product.id !== id)
            setProductsLiked(productsLikedWithout)
        }
    }

    return (
        <LayoutBase showActions showResearchInput showTabBar showUserInfo>
            <Box display='flex' justifyContent='center' alignItems='center' height='100%'>
                <Box component={Paper} elevation={2} width='1270px' height='750px' display='flex' flexDirection='column' padding={2}>
                    <Box width='100%'height='20%'>
                        <Typography 
                            variant="h5" 
                            color="black" 
                            fontWeight="bold" 
                            overflow='hidden'
                            textOverflow='ellipsis'
                            sx={{ wordBreak: 'break-word', display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical" }}
                        >
                            {productInfo.title}
                        </Typography>
                    </Box>
                    <Box flex={1} width='100%' display='flex'> 
                        <Box width='50%' display='flex' flexDirection='column'>
                            <Box flex={1} width='100%' display='flex' flexDirection='column'>
                                <Box width='100%' height='10%' display='flex' justifyContent='space-between'>
                                    <Box width='30%'display='flex' justifyContent='center' alignItems='center'>
                                        <Typography variant="subtitle1" color='black' fontWeight='bold'>
                                            {productInfo.title.split(' ')[0]}
                                        </Typography>
                                    </Box>
                                    <Divider orientation="vertical" flexItem/>
                                    <Box width='30%' display='flex' justifyContent='center' alignItems='center'>
                                        <Rating value={productInfo.rating} precision={0.5} readOnly max={5} size='large' />
                                    </Box>
                                    <Divider orientation="vertical" flexItem/>
                                    <Box width='30%' display='flex' justifyContent='center' alignItems='center' gap={2}>
                                        <IconButton color='primary' size="medium">
                                            <ShareIcon sx={{fontSize: '2rem'}}/>
                                        </IconButton>
                                        <IconButton size="medium" onClick={addProductInLiked}>
                                            <FavoriteIcon sx={{ fontSize: '2rem' }} color={isFavorite ? 'primary' : 'inherit'} />
                                        </IconButton>
                                    </Box>
                                </Box>
                                <Box flex={1} width='100%' display='flex'>
                                    <Box width='10%' border='1px solid black'>
                                            
                                    </Box> 
                                    <Box flex={1} display='flex' justifyContent='center' alignItems='center'>
                                        <MyImage alt={productInfo.title} src={productInfo.img} width='290px' />
                                    </Box>
                                </Box>
                            </Box>
                            <Box width='100%' height='150px' display='flex' justifyContent='center' alignItems='start' flexDirection='column' gap={1}>
                                <Typography variant="subtitle1" color='black' fontWeight='bold'>
                                    Consultar frete e prazo de entrega
                                </Typography>
                                <Box display='flex' gap={1} height='40%'>
                                    <TextField placeholder="Inserir CEP"/>
                                    <Button variant="outlined" sx={{fontSize: '1.2rem'}}>
                                        OK
                                    </Button>
                                </Box>
                            </Box>
                        </Box>
                        <Box flex={1} display='flex' flexDirection='column'>
                            <Box flex={1} width='100%' display='flex' flexDirection='column'>
                                <Box flex={1}>
                                    <Box height='60%' display='flex' flexDirection='column'>
                                        <Box flex={1} display='flex' alignItems='center'> 
                                            <Typography color='primary' variant="h2" fontWeight='bold'>
                                                {productInfo.price}
                                            </Typography>
                                        </Box>
                                        <Box width='50%' height='30%' display='flex' justifyContent='center'>
                                            <Button 
                                                variant="contained" 
                                                fullWidth 
                                                size="large" 
                                                startIcon={isAlreadyInCart ? <ShoppingCartCheckoutIcon /> : <AddShoppingCartIcon />} 
                                                sx={{fontSize:'1.5rem'}} 
                                                onClick={() => addProductInCart(productInfo.id)}
                                            >
                                                {isAlreadyInCart ? 'NO CARRINHO' : 'COMPRAR'}
                                            </Button>
                                        </Box>
                                    </Box>
                                </Box>
                                <Box height='20%' display='flex' alignItems='end'>
                                    <Box display='flex' justifyContent='start' alignItems='center' width='auto' gap={1}>
                                        <SellIcon color="primary" sx={{ fontSize: '1rem' }} />
                                        <Typography variant="h6" color='black' fontWeight='bold' noWrap>
                                            PRODUTOS SIMILARES
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                            <Box width='620px' height='150px'>
                                <Carousel showMiniCard /> 
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </LayoutBase>
    );
}
