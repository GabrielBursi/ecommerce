import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { LayoutBase } from "../layouts";
import { ListFavorites } from "../components";
import { ProductsContext } from "../contexts";

export function FavoritePage() {

    const theme = useTheme()
    const mdDown = useMediaQuery(theme.breakpoints.down('md'))
    const smDown = useMediaQuery(theme.breakpoints.down('sm'))

    const { productsFavorited } = useContext(ProductsContext)

    const navigate = useNavigate()

    return (
        <LayoutBase showActions showResearchInput showUserInfo showTabBar>
            <Box display='flex' justifyContent='center' alignItems='center' width='100%' height='100%' >
                <Box display='flex' flexDirection='column' width='95%' height='100%' paddingY={2} gap={2}>
                    <Box  height="10%" display='flex' alignItems='center'>
                        <Typography variant={smDown ? 'h4' : mdDown ? 'h3' : 'h2'} color='primary'>
                            {smDown ? <ArrowBackIosNewIcon onClick={() => {navigate('/')}}/> : <FavoriteIcon fontSize="large"/>} FAVORITOS
                        </Typography>
                    </Box>
                    <Box flex={1} display='flex' flexDirection='column' gap={2}>
                        { 
                            productsFavorited.map(product => (
                                <ListFavorites
                                    id={product.id}
                                    key={product.id}
                                    img={product.img}
                                    name={product.name}
                                    price={product.price}
                                    rating={product.rating}
                                />
                            ))
                        }
                    </Box>
                </Box>
            </Box>
        </LayoutBase>
    );
}