import { useContext, useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";
import { motion } from "framer-motion";
import { ProductCard } from "./ProductCard";
import { ProductsContext } from "../../contexts";

export function Carousel() {

    const carousel = useRef<HTMLElement>()
    const [width, setWidth] = useState<number | string>(0);

    const { products } = useContext(ProductsContext)

    useEffect(() => {
        if(carousel.current)
        setWidth(carousel.current?.scrollWidth - carousel.current?.offsetWidth);
        
    }, []);

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
                {products.map(product => (
                    <Box
                        key={product.id}
                        sx={{
                            minHeight: '200px',
                            minWidth: '400px',
                            padding: 1,
                        }}
                    >
                        <ProductCard
                            id={product.id}
                            key={product.id}
                            img={product.img}
                            price={product.price}
                            rating={product.rating}
                            title={product.title}
                            mdDown={true}
                            width='100%'
                            height='90%'
                        />
                    </Box>
                ))}
            </Box>
        </Box>
    );
}