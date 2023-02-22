import { useContext } from "react";
import { LoginContext, ThemeContext } from "../contexts";
import { Box, Button, useMediaQuery, useTheme } from "@mui/material";
import {LayoutBase} from "../layouts";
import { IProducts } from "../types";
import { ProductCard } from "../components";

export function HomePage() {

    const { toggleTheme } = useContext(ThemeContext)
    const { isLogged, setIsLogged } = useContext(LoginContext)

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

    const theme = useTheme()
    const mdDown = useMediaQuery(theme.breakpoints.down('md'))

    return (
        <LayoutBase showResearchInput showUserInfo showActions = {isLogged}>
            <h1>Home Page</h1>
            <Button variant="contained" color="primary" onClick={toggleTheme}>Mudar tema</Button>
            <Button variant="contained" color="primary" onClick={() => setIsLogged(!isLogged)}>{isLogged ? 'Logout' : 'Login'}</Button>
            <Box display='flex' flexDirection='column' width='100%' gap={2}>
                {arrayDeProdutosTESTE.map(product => (
                    <ProductCard
                        id={product.id}
                        key={product.id}
                        img={product.img}
                        rating={product.rating}
                        price={product.price}
                        title={product.title}
                        mdDown={mdDown}
                    />
                ))}
            </Box>
        </LayoutBase>
    );
}
