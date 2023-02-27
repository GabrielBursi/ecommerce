import { memo } from "react";
import { Box, Button, Card, CardActionArea, CardActions, CardContent, IconButton, Rating, Typography } from "@mui/material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { MyImage } from "../Products/MyImage";
import { IProducts } from "../../types";

interface ProductCardProps extends IProducts {
    width?: number | string,
    height?: number | string,
    mdDown?: boolean,
    addProductInLiked: () => void,
    addProductInCart: (id: number | string) => void,
    seeProduct: () => void,
    isFavorite: boolean,
    isAlreadyInCart: boolean
}

function ProductCardMobileMemo({ img, price, title, rating, id, addProductInCart, addProductInLiked, seeProduct, isAlreadyInCart, isFavorite }: ProductCardProps) {
    return (
        <Card sx={{ width: 290, height: 220 }} elevation={2}>
            <CardActionArea onClick={seeProduct}>
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
                    <IconButton size="small" onClick={addProductInLiked}>
                        <FavoriteIcon color={isFavorite ? "primary" : "inherit"} fontSize="small" />
                    </IconButton>
                </Box>
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
                            gap: 2
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
            </CardActionArea>
            <CardActions disableSpacing>
                <Button
                    variant="contained"
                    startIcon={isAlreadyInCart ? <ShoppingCartCheckoutIcon /> : <AddShoppingCartIcon />}
                    fullWidth
                    size="medium"
                    onClick={() => { id && addProductInCart(id) }}
                >
                    {isAlreadyInCart ? 'IR AO CARRINHO' : 'COMPRAR'}
                </Button>
            </CardActions>
        </Card>
    );
}

export const ProductCardMobile = memo(ProductCardMobileMemo)