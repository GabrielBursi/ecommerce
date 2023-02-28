import { useContext, useEffect, useState } from "react";
import { Box, Button, Divider, IconButton, Paper, Rating, TextField, Typography } from "@mui/material";
import SellIcon from '@mui/icons-material/Sell';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import { useParams } from "react-router-dom";
import { LayoutBase } from "../layouts";
import { IProducts } from "../types";
import { ProductsContext } from "../contexts";
import { Carousel, MyImage } from "../components";

export function ProductPage() {

    const { id } =useParams<'id'>()

    const [productInfo, setProductInfo] = useState<IProducts>();

    const { products } = useContext(ProductsContext)

    useEffect(() => {
        if(id){
            const productSelected = products.find(product => product.id === id)
            setProductInfo(productSelected)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    return (
        <LayoutBase showActions showResearchInput showTabBar showUserInfo>
            <Box display='flex' justifyContent='center' alignItems='center' height='100%'>
                <Box component={Paper} elevation={2} width='1570px' height='750px' display='flex' flexDirection='column' padding={2}>
                    <Box width='100%'height='20%'>
                        <Typography 
                            variant="h5" 
                            color="black" 
                            fontWeight="bold" 
                            overflow='hidden'
                            textOverflow='ellipsis'
                            sx={{ wordBreak: 'break-word', display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical" }}
                        >
                            {productInfo?.title}
                        </Typography>
                    </Box>
                    <Box flex={1} width='100%' display='flex'> 
                        <Box width='50%' display='flex' flexDirection='column'>
                            <Box flex={1} width='100%' display='flex' flexDirection='column'>
                                <Box width='100%' height='10%' display='flex' justifyContent='space-between'>
                                    <Box width='30%'display='flex' justifyContent='center' alignItems='center'>
                                        <Typography variant="subtitle1" color='black' fontWeight='bold'>
                                            {productInfo?.title.split(' ')[0]}
                                        </Typography>
                                    </Box>
                                    <Divider orientation="vertical" flexItem/>
                                    <Box width='30%' display='flex' justifyContent='center' alignItems='center'>
                                        <Rating value={productInfo?.rating} precision={0.5} readOnly max={5} size='large' />
                                    </Box>
                                    <Divider orientation="vertical" flexItem/>
                                    <Box width='30%' display='flex' justifyContent='center' alignItems='center' gap={2}>
                                        <IconButton color='primary' size="medium">
                                            <ShareIcon sx={{fontSize: '2rem'}}/>
                                        </IconButton>
                                        <IconButton color='primary' size="medium">
                                            <FavoriteIcon sx={{fontSize: '2rem'}}/>
                                        </IconButton>
                                    </Box>
                                </Box>
                                <Box flex={1} width='100%' display='flex'>
                                    <Box width='10%'>

                                    </Box> 
                                    <Box flex={1} display='flex' justifyContent='center' alignItems='center'>
                                        <MyImage alt={productInfo?.title || ''} src={productInfo?.img || ''} width='290px' />
                                    </Box>
                                </Box>
                            </Box>
                            <Box width='100%' height='25%' display='flex' justifyContent='center' alignItems='start' flexDirection='column' gap={1}>
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
                                    <Box height='60%' display='flex'>
                                        <Box flex={1}> 

                                        </Box>
                                        <Box width='40%'>
                                            
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
                            <Box width='100%' height='25%'>
                                {/* <Carousel showMiniCard /> */} 
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </LayoutBase>
    );
}
