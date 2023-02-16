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
            title: 'Apple iPhone 13, 128GB, Blue - Unlocked (Renewed)',
            description: 'dsdsd',
            img: 'https://images.kabum.com.br/produtos/fotos/120487/headset-gamer-sem-fio-logitech-g733-rgb-lightsync-7-1-dolby-surround-com-blue-voice-preto-981-000863_1612874214_m.jpg',
            price: '$749.00',
            rating: 2
        },
        {
            id: Math.random(),
            title: 'Apple MacBook Air (13-inch Retina display, 1.6GHz dual-core Intel Core i5, 128GB) - Gold (Renewed)',
            description: 'dsdsd',
            img: 'https://images.kabum.com.br/produtos/fotos/85198/85198_1484306114_m.jpg',
            price: '$5,000.97',
            rating: 3.5
        }
    ]

    return (
        <LayoutBase showActions showResearchInput showUserInfo>
            <Box display='flex' justifyContent='center' alignItems='center' width='100%' height='100%' >
                <Box display='flex' flexDirection='column' width='80%' height='100%' paddingY={2} gap={2}>
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
                                title={product.title}
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