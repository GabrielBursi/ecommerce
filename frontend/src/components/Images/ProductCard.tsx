import { useState } from "react";
import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardHeader, IconButton, Rating, Typography } from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { MyImage } from "./MyImage";
import { IProducts } from "../../types";

export function ProductCard({ img, price, title, rating }: IProducts) {

    const [hover, setHover] = useState<boolean>(false);
    const [isFavorite, setIsFavorite] = useState<boolean>(false);

    return (
        <Card sx={{ width: 270, height: 400 }} elevation={hover ? 10 : 2} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
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
                            <IconButton size="small" onClick={() => setIsFavorite(oldIsFavorite => !oldIsFavorite)}>
                                <FavoriteIcon color={isFavorite ? "primary" : "inherit"} fontSize="small" />
                            </IconButton>
                            :
                            <Rating value={rating} precision={0.5} readOnly max={5} size='small' color="primary" />
                        }
                    />
                </Box>
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
                <CardContent>
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
                <CardContent sx={{paddingY: 1}}>
                    <Typography variant="h5" color="primary" fontWeight='bold'>
                        {price}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions disableSpacing>
                <Button variant="contained" startIcon={<ShoppingCartIcon />} fullWidth size="large">COMPRAR</Button>
            </CardActions>
        </Card>
    );
}   