import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Paper, Typography } from "@mui/material";
import SellIcon from '@mui/icons-material/Sell';
import { ActionsProduct, ImagemZoom, NameProduct, Price, SearchCep } from ".";
import { Carousel } from "../Products/Carousel";
import { IProducts, MyImageProps } from "../../types";
import { LoginContext, ProductsContext } from "../../contexts";

interface ProductSelectedProps extends IProducts, MyImageProps {}

export function ProductSelected({ name, rating, alt, src, price, id, img }: ProductSelectedProps) {

    const { productsInCart, productsLiked, addProductInCart, addProductInLiked, filterProductsAndSetFavoriteOrInCart } = useContext(ProductsContext)
    const { isLogged } = useContext(LoginContext)

    const [isFavorite, setIsFavorite] = useState<boolean>(false);
    const [isAlreadyInCart, setIsAlreadyInCart] = useState<boolean>(false);

    const navigate = useNavigate()

    useEffect(() => {
        filterProductsAndSetFavoriteOrInCart('card produto', id, setIsAlreadyInCart, setIsFavorite)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productsLiked, productsInCart]);

    return (
        <Box component={Paper} elevation={2} width='1270px' height='750px' display='flex' flexDirection='column' padding={2}>
            <NameProduct name={name}/> 
            <Box flex={1} width='100%' display='flex'>
                <Box width='50%' display='flex' flexDirection='column'>
                    <Box flex={1} width='100%' display='flex' flexDirection='column'>
                        <ActionsProduct 
                            name={name} 
                            rating={rating} 
                            addProductInLiked={addProductInLiked} 
                            isFavorite={isFavorite} 
                            isLogged={isLogged} 
                            navigate={navigate} 
                            product={{id, name, img, price, rating}} 
                            setIsFavorite={setIsFavorite}
                        /> 
                        <Box flex={1} width='100%' display='flex'>
                            <Box width='10%' border='1px solid black'>

                            </Box>
                            <ImagemZoom alt={alt} src={src} /> 
                        </Box>
                    </Box>
                    <SearchCep/> 
                </Box>
                <Box flex={1} display='flex' flexDirection='column'>
                    <Box flex={1} width='100%' display='flex' flexDirection='column'>
                        <Price 
                            price={price}
                            addProductInCart={addProductInCart}
                            isAlreadyInCart={isAlreadyInCart}
                            isLogged={isLogged}
                            navigate={navigate}
                            product={{ id, name, img, price, rating }}
                        />
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
    );
}
