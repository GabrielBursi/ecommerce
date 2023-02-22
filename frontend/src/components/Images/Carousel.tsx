import { Box } from "@mui/material";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { IProducts } from "../../types";
import { ProductCard } from "./ProductCard";

export function Carousel() {

    const carousel = useRef<HTMLElement>()
    const [width, setWidth] = useState<number | string>(0);

    useEffect(() => {
        if(carousel.current)
        setWidth(carousel.current?.scrollWidth - carousel.current?.offsetWidth);
        
    }, []);

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
        <Box
            ref={carousel}
            component={motion.div}
            whileTap={{ cursor: 'grabbing' }}
            sx={{
                height: '90%',
                cursor: 'grab',
                overflow: 'hidden'
            }}
        >
            <Box
                component={motion.div}
                drag='x'
                dragConstraints={{ right:0, left: -width }}
                initial={{ x: 100 }}
                animate={{ x: 0 }}
                transition={{ duration: 0.8 }}
                sx={{
                    display: 'flex',
                }}
            >
                {arrayDeProdutosTESTE.map(product => (
                    <Box
                        key={product.id}
                        sx={{
                            minHeight: '200px',
                            minWidth: '400px',
                            padding: 1,
                        }}
                    >
                        <ProductCard
                            key={product.id}
                            img={product.img}
                            price={product.price}
                            title={product.title}
                            width='100%'
                            height='90%'
                        />
                    </Box>
                ))}
            </Box>
        </Box>
    );
}