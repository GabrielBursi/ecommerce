import { useContext, useEffect, useRef, useState } from "react";
import { Box, Skeleton } from "@mui/material";
import { motion } from "framer-motion";
import { ProductCard } from "./ProductCard";
import { ProductsContext } from "../../contexts";
import { MiniCardProduct } from "./MiniCardProduct";

interface CarouselProps {
    showMiniCard?: boolean
}

export function Carousel({ showMiniCard = false }: CarouselProps) {

    const carousel = useRef<HTMLElement>()
    const [width, setWidth] = useState<number | string>(0);

    const { products, isLoadingGetProducts } = useContext(ProductsContext)

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
                height: showMiniCard ? '100%' : 'auto',
                width: '100%',
                cursor: 'grab',
                overflow: 'hidden',
            }}
        >
            <Box
                component={motion.div}
                drag='x'
                dragConstraints={{ right: 0, left: -width }}
                initial={{ x: 100 }}
                animate={{ x: 0 }}
                transition={{ duration: 0.8 }}
                sx={{
                    display: 'flex',
                    height: '100%'
                }}
            >
                {isLoadingGetProducts ?
                    [1,2,3,4,5].map(item =>
                            <Skeleton
                                key={item}
                                sx={{
                                    width: '275px',
                                    height: '250px',
                                    margin: 2
                                }}
                            />
                    )
                    :
                    products.map(product => (
                        <Box
                            key={product.uuid}
                            sx={{
                                height: 'auto',
                                width: 'auto',
                                padding: showMiniCard ? 0 : 2,
                                ml: showMiniCard ? 2 : 0,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            {showMiniCard ?
                                <MiniCardProduct
                                    uuid={product.uuid}
                                    key={product.uuid}
                                    img={product.img}
                                    price={product.price}
                                    rating={product.rating}
                                    name={product.name}
                                />
                                :
                                <ProductCard
                                    uuid={product.uuid}
                                    key={product.uuid}
                                    img={product.img}
                                    price={product.price}
                                    rating={product.rating}
                                    name={product.name}
                                    mdDown={true}
                                    width='100%'
                                    height='90%'
                                />
                            }
                        </Box>
                    ))
                }
            </Box>
        </Box>
    );
}