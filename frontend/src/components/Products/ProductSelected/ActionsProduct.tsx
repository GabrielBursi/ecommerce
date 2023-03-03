import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Divider, IconButton, Rating, Typography } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import { IProducts } from "../../../types";
import { LoginContext, ProductsContext } from "../../../contexts";

interface ActionsProductProps {
    product: IProducts, 
}

export function ActionsProduct({ product }: ActionsProductProps) {

    const navigate = useNavigate()

    const { filterProductsAndSetFavoriteOrInCart, productsFavorited, addProductInFavorited } = useContext(ProductsContext)
    const { isLogged } = useContext(LoginContext)

    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        filterProductsAndSetFavoriteOrInCart(productsFavorited, product.id, setIsFavorite)

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [product.id, productsFavorited]);

    return (
        <Box width='100%' height='10%' display='flex' justifyContent='space-between'>
            <Box width='30%' display='flex' justifyContent='center' alignItems='center'>
                <Typography variant="subtitle1" color='black' fontWeight='bold'>
                    {product.name.split(' ')[0]}
                </Typography>
            </Box>
            <Divider orientation="vertical" flexItem />
            <Box width='30%' display='flex' justifyContent='center' alignItems='center'>
                <Rating value={product.rating} precision={0.5} readOnly max={5} size='large' />
            </Box>
            <Divider orientation="vertical" flexItem />
            <Box width='30%' display='flex' justifyContent='center' alignItems='center' gap={2}>
                <IconButton color='primary' size="medium">
                    <ShareIcon sx={{ fontSize: '2rem' }} />
                </IconButton>
                <IconButton size="medium" onClick={() => {
                    addProductInFavorited(isLogged, navigate, setIsFavorite, isFavorite, product, product.id)
                }}>
                    <FavoriteIcon sx={{ fontSize: '2rem' }} color={isFavorite ? 'primary' : 'inherit'} />
                </IconButton>
            </Box>
        </Box>
    );
}
