import { useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, Grid, Paper, Typography, useMediaQuery, useTheme } from "@mui/material";
import { LoginContext, ShoppingContext } from "../contexts";
import { LayoutBase } from "../layouts";
import { Carousel, PreCartInfo } from "../components";
import { IProducts } from "../types";
import { ServicesProducts } from "../services/api";

export function PreCartPage() {
    
    const theme = useTheme()
    const smDown = useMediaQuery(theme.breakpoints.down('sm'))
    const mdDown = useMediaQuery(theme.breakpoints.down('md'))
    
    const { uuid } = useParams<'uuid'>();

    const { isLogged } = useContext(LoginContext)
    const { userShop } = useContext(ShoppingContext)

    const [productAddInCart, setProductAddInCart] = useState<IProducts>();

    const navigate = useNavigate()

    const category = 'home'

    const { data, isLoading } = useQuery({ queryKey: ['products-category'], queryFn: () => ServicesProducts.getProductsByCategory(category, 1, 20, 1, 999999) })

    useEffect(() => {
        if(!uuid){
            return console.log('teste');
            
        }
        const arrProductAdded = userShop?.cart.products.filter(product => product.uuid === uuid);
        const [productAdded] = arrProductAdded || []
        setProductAddInCart(productAdded)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [uuid]);


    return (
        <LayoutBase showActions = {isLogged} showResearchInput showUserInfo showTabBar>
            <Box display='flex' justifyContent='center' alignItems='start' width='100%' height='100%' pt={2}>
                <Grid container spacing={2} width={ mdDown ?  '100%' : '80%' } height='90%'>
                    <Grid item xs={12} height={mdDown ? '35%' : '55%'}>
                        {productAddInCart && <PreCartInfo img={productAddInCart.img} price={productAddInCart.price} name={productAddInCart.name} uuid={uuid || 'uuid não existe'} />}
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
                                {!(data instanceof Error) && <Carousel data={data?.products} isLoading={isLoading} />}
                            </>
                            :
                            <Box height='85%' padding={2} component={Paper} elevation={10}>
                                <Typography color='primary' variant={mdDown ? 'subtitle1' : 'h5'} noWrap>
                                    PRODUTOS RELACIONADOS
                                </Typography>
                                {!(data instanceof Error) && <Carousel data={data?.products} isLoading={isLoading} />}
                            </Box>
                        }
                    </Grid>
                </Grid>
            </Box>
        </LayoutBase>
    );
}
