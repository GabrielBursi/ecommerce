import { useNavigate } from "react-router-dom";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { LayoutBase } from "../layouts";
import { ListFavorites } from "../components";
import { IProducts } from "../types";

export function FavoritePage() {

    const theme = useTheme()
    const mdDown = useMediaQuery(theme.breakpoints.down('md'))
    const smDown = useMediaQuery(theme.breakpoints.down('sm'))

    const navigate = useNavigate()

    const arrayDeProdutosTESTE: IProducts[] = [{
            id: Math.random(),
            title: 'Apple iPhone 14, 128GB, Blue - Unlocked (Renewed)',
            description: 'dsdsd',
            img: 'https://m.media-amazon.com/images/I/61bK6PMOC3L._AC_UY654_QL65_.jpg',
            price: '$698.97',
            rating: 3.7
        },
        {
            id: Math.random(),
            title: 'Apple 2023 MacBook Pro Laptop M2 Pro chip with 12‑core CPU and 19‑core GPU: 16.2-inch Liquid Retina XDR Display, 16GB Unified Memory, 1TB SSD Storage. Works with iPhone/iPad; Space Gray',
            description: 'dsdsd',
            img: 'https://m.media-amazon.com/images/I/61fd2oCrvyL._AC_UY654_QL65_.jpg',
            price: '$2,649.99',
            rating: 3.6
        },
        {
            id: Math.random(),
            title: 'Apple Watch Series 7 (GPS, 45mm) Green Aluminum Case with Clover Sport Band, Regular (Renewed)',
            description: 'dsdsd',
            img: 'https://m.media-amazon.com/images/I/61NOPVDJghL._AC_UY654_QL65_.jpg',
            price: '$354.99',
            rating: 4.4
        },
        {
            id: Math.random(),
            title: 'Skytech Archangel 3.0 Gaming PC Desktop – Intel Core i5 10400F 2.9 GHz, NVIDIA RTX 3060, 1TB NVME SSD, 16GB DDR4 RAM 3200, 600W Gold PSU, 11AC Wi-Fi, Windows 11 Home 64-bit',
            description: 'dsdsd',
            img: 'https://m.media-amazon.com/images/I/818vY0K7DAL._AC_UY654_QL65_.jpg',
            price: '$999.99',
            rating: 4.5
        },
        {
            id: Math.random(),
            title: 'SpaghettiOs Canned Pasta with Meatballs, Healthy Snack for Kids and Adults, 15.6 OZ Can (Pack of 12)',
            description: 'dsdsd',
            img: 'https://m.media-amazon.com/images/I/71uYB-oQXpL._AC_UL960_QL65_.jpg',
            price: '$11.44',
            rating: 4.6
        }
        
    ]

    return (
        <LayoutBase showActions showResearchInput showUserInfo>
            <Box display='flex' justifyContent='center' alignItems='center' width='100%' height='100%' >
                <Box display='flex' flexDirection='column' width='95%' height='100%' paddingY={2} gap={2}>
                    <Box  height="10%" display='flex' alignItems='center'>
                        <Typography variant={smDown ? 'h4' : mdDown ? 'h3' : 'h2'} color='primary'>
                            {smDown ? <ArrowBackIosNewIcon onClick={() => {navigate('/')}}/> : <FavoriteIcon fontSize="large"/>} FAVORITOS
                        </Typography>
                    </Box>
                    <Box flex={1} display='flex' flexDirection='column' gap={2}>
                        { 
                            arrayDeProdutosTESTE.map(product => (
                                <ListFavorites
                                    key={product.id}
                                    img={product.img}
                                    title={product.title}
                                    price={product.price}
                                    rating={product.rating}
                                    smDown={smDown}
                                />
                            ))
                        }
                    </Box>
                </Box>
            </Box>
        </LayoutBase>
    );
}