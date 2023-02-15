import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { LayoutBase } from "../layouts";
import { ListFavorites } from "../components";
import { IProducts } from "../types";

export function FavoritePage() {

    const theme = useTheme()
    const mdDown = useMediaQuery(theme.breakpoints.down('md'))
    const smDown = useMediaQuery(theme.breakpoints.down('sm'))

    const arrayDeFavoritos: IProducts[] = [{
            id: Math.random(),
            name: 'teste',
            description: 'dsdsd',
            img: 'sasasa',
            price: '12',
            rating: 12
        },
        {
            id: Math.random(),
            name: 'teste',
            description: 'dsdsd',
            img: 'sasasa',
            price: '12',
            rating: 12
        }
    ]

    return (
        <LayoutBase showActions showResearchInput showUserInfo>
            <Box display='flex' justifyContent='center' alignItems='center' width='100%' height='100%' >
                <Box display='flex' flexDirection='column' width='80%' height='100%' paddingY={4} gap={2}>
                    <Box  height="10%" display='flex' alignItems='center'>
                        <Typography variant={smDown ? 'h4' : mdDown ? 'h3' : 'h2'} color='primary'>
                            <FavoriteIcon sx={{fontSize:40}}/> FAVORITOS
                        </Typography>
                    </Box>
                    <Box flex={1} display='flex' flexDirection='column' gap={2}>
                        {arrayDeFavoritos.map(product => (
                            <ListFavorites
                                key={product.id}
                                img={product.img}
                                name={product.name}
                                description={product.description}
                                price={product.price}
                                rating={product.rating}
                            />
                        ))}
                    </Box>
                </Box>
            </Box>
        </LayoutBase>
    );
}