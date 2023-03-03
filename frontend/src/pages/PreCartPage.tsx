import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, Grid, Paper, Typography, useMediaQuery, useTheme } from "@mui/material";
import { LoginContext, ProductsContext } from "../contexts";
import { LayoutBase } from "../layouts";
import { Carousel, PreCartInfo } from "../components";
import { IProducts } from "../types";

export function PreCartPage() {
    
    const theme = useTheme()
    const smDown = useMediaQuery(theme.breakpoints.down('sm'))
    const mdDown = useMediaQuery(theme.breakpoints.down('md'))
    
    const { id } = useParams<'id'>();

    const { isLogged } = useContext(LoginContext)
    const { productsInCart } = useContext(ProductsContext)

    const [productAddInCart, setProductAddInCart] = useState<IProducts>();

    const navigate = useNavigate()

    useEffect(() => {
        if(!id){
            return console.log('teste');
            
        }
        const arrProductAdded = productsInCart.filter(product => product.id === id);
        const [productAdded] = arrProductAdded
        setProductAddInCart(productAdded)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);


    return (
        <LayoutBase showActions = {isLogged} showResearchInput showUserInfo showTabBar>
            <Box display='flex' justifyContent='center' alignItems='start' width='100%' height='100%' pt={2}>
                <Grid container spacing={2} width={ mdDown ?  '100%' : '80%' } height='90%'>
                    <Grid item xs={12} height={mdDown ? '35%' : '55%'}>
                        {productAddInCart && <PreCartInfo img={productAddInCart.img} price={productAddInCart.price} name={productAddInCart.name} id={id || 'id não existe'} />}
                    </Grid>
                        { mdDown &&
                            <Grid item xs={12} height='auto'>
                                <Box component={Paper} height='100%' display='flex' flexDirection={ smDown ? 'column-reverse' : 'row'}  justifyContent='space-center' alignItems='center' gap={2} padding={2}>
                                <Button variant="outlined" size="large" fullWidth sx={{ fontSize: 15 }} onClick={() => navigate('/')}>CONTINUAR COMPRANDO</Button>
                                    <Button variant="contained" size="large" fullWidth sx={{ fontSize: 15 }} onClick={() => navigate('/cart')}>IR PARA O CARRINHO</Button>
                                </Box>
                            </Grid>
                        }
                    
                    <Grid item xs={12} height='55%'>
                        { smDown ? 
                            <>
                                <Typography color='primary' variant='h6' noWrap>
                                    PRODUTOS RELACIONADOS
                                </Typography>
                                <Carousel/>
                            </>
                            :
                            <Box height='85%' padding={2} component={Paper} elevation={10}>
                                <Typography color='primary' variant={mdDown ? 'subtitle1' : 'h5'} noWrap>
                                    PRODUTOS RELACIONADOS
                                </Typography>
                                <Carousel/>
                            </Box>
                        }
                    </Grid>
                </Grid>
            </Box>
        </LayoutBase>
    );
}
