import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { LayoutBase } from "../layouts";
import { EmptyMessage, ListFavorites } from "../components";
import { ShoppingContext } from "../contexts";

export function FavoritePage() {

    const theme = useTheme()
    const mdDown = useMediaQuery(theme.breakpoints.down('md'))
    const smDown = useMediaQuery(theme.breakpoints.down('sm'))

    const { userShop } = useContext(ShoppingContext)

    const navigate = useNavigate()

    return (
        <LayoutBase showActions showResearchInput showUserInfo showTabBar>
            <Box display='flex' justifyContent='center' alignItems='center' width='100%' height='auto'>
                <Box display='flex' flexDirection='column' width='75%' height='100%' paddingY={2} gap={2}>
                { userShop && userShop.favorites.length > 0 ?
                    <>
                        <Box  height="10%" display='flex' alignItems='center'>
                            <Typography variant={smDown ? 'h4' : mdDown ? 'h3' : 'h2'} color='primary'>
                                {smDown ? <ArrowBackIosNewIcon onClick={() => {navigate('/')}}/> : <FavoriteIcon fontSize="large"/>} FAVORITOS
                            </Typography>
                        </Box>
                        <Box flex={1} display='flex' flexDirection='column' gap={2}>
                            { 
                                userShop?.favorites.map(product => (
                                    <ListFavorites
                                        uuid={product.uuid}
                                        key={product.uuid}
                                        img={product.img}
                                        name={product.name}
                                        price={product.price}
                                        rating={product.rating}
                                    />
                                ))
                            }
                        </Box>
                    </>
                    :
                    <EmptyMessage alert="nenhum produto favorito"/>
                }
                    </Box>
            </Box>
        </LayoutBase>
    );
}