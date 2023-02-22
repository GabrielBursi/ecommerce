import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Grid, Paper, Typography, useMediaQuery, useTheme } from "@mui/material";
import { LoginContext, ProductsContext } from "../contexts";
import { LayoutBase } from "../layouts";
import { Carousel, PreCartInfo } from "../components";
import { IProducts } from "../types";

export function PreCartPage() {

    const { isLogged } = useContext(LoginContext)
    const { productsInCart } = useContext(ProductsContext)

    const [productAddInCart, setProductAddInCart] = useState<IProducts>();

    const { id } = useParams<'id'>();

    useEffect(() => {
        const productAdded = productsInCart.find(product => product.id === id);
        setProductAddInCart(productAdded)
    }, [id]);

    const theme = useTheme()
    const smDown = useMediaQuery(theme.breakpoints.down('sm'))
    const mdDown = useMediaQuery(theme.breakpoints.down('md'))

    return (
        <LayoutBase showActions = {isLogged} showResearchInput showUserInfo>
            <Box display='flex' justifyContent='center' alignItems='center' width='100%' height='100%'>
                <Grid container rowGap={2} columnGap={2} width='80%' height='80%'>
                    <Grid item xs={12} height='50%'>
                        {productAddInCart && <PreCartInfo img={productAddInCart?.img} price={productAddInCart?.price} title={productAddInCart?.title} />}
                    </Grid>
                    <Grid item xs={8} height='50%'>
                        <Box height='100%' padding={2} component={Paper}>
                            <Typography color='primary' variant={smDown ? 'subtitle2' : mdDown ? 'subtitle1' : 'h5'} noWrap>
                                PRODUTOS RELACIONADOS
                            </Typography>
                            <Carousel/>
                        </Box>
                    </Grid>
                    <Grid item xs height='50%'>
                        <Box height='100%' padding={2} component={Paper}>
                            serviços
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </LayoutBase>
    );
}
