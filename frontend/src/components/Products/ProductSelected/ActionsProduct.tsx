import { useContext, useEffect, useState } from "react";
import { Box, Divider, IconButton, Rating, Typography, useMediaQuery, useTheme } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import { IProducts } from "../../../types";
import { ProductsContext, ShoppingContext } from "../../../contexts";
import { ModalURL } from "../../Modal/ModalURL";

interface ActionsProductProps {
    product: IProducts, 
}

export function ActionsProduct({ product }: ActionsProductProps) {

    const theme = useTheme()
    const mdDown = useMediaQuery(theme.breakpoints.down('md'))

    const { addProductInFavorites, removeProductFavorited, isLoadingAddProduct, isLoadingRemoveProduct } = useContext(ProductsContext)
    const { userShop } = useContext(ShoppingContext)

    const [isFavorite, setIsFavorite] = useState(false);
    const [url, setUrl] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setUrl(window.location.href)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [product.uuid]);

    useEffect(() => {
        const productIsFavorite = userShop?.favorites.find(p => p.uuid === product.uuid)
        if(productIsFavorite){
            setIsFavorite(true)
        }else{
            setIsFavorite(false)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userShop?.favorites, product.uuid]);

    return (
        <Box width='100%' height='10%' display='flex' justifyContent='space-between' gap={1}>
            <Box width='30%' display='flex' justifyContent='center' alignItems='center'>
                <Typography variant={mdDown ? "subtitle2" : "subtitle1"} color='black' fontWeight='bold'>
                    {product.name.split(' ')[0]}
                </Typography>
            </Box>
            <Divider orientation="vertical" flexItem />
            <Box width='30%' display='flex' justifyContent='center' alignItems='center'>
                <Rating value={product.rating} precision={0.5} readOnly max={5} size={mdDown ? 'small' : 'medium'} />
            </Box>
            <Divider orientation="vertical" flexItem />
            <Box width='30%' display='flex' justifyContent='center' alignItems='center' gap={2}>
                <IconButton color='primary' size={mdDown ? "small" : "medium"} onClick={() => setIsOpen(true)}>
                    <ShareIcon sx={{ fontSize: mdDown ? '1.4rem' : '1.8rem' }} />
                </IconButton>
                <IconButton disabled={isLoadingAddProduct || isLoadingRemoveProduct} size={mdDown ? "small" : "medium"} onClick={async () => {
                    isFavorite ? await removeProductFavorited(product.uuid, setIsFavorite) : await addProductInFavorites(product.uuid, setIsFavorite)
                }}>
                    <FavoriteIcon sx={{ fontSize: mdDown ? '1.4rem' : '1.8rem' }} color={isFavorite ? 'primary' : 'inherit'} />
                </IconButton>
            </Box>
            <ModalURL isOpen={isOpen} setIsOpen={setIsOpen} url={url}/>
        </Box>
    );
}
