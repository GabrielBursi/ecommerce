import { useEffect, useState, MouseEvent } from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { MyImageProps } from "../../../types";
import { LazyLoadImage } from "react-lazy-load-image-component";

export function ImagemZoom({alt, src}: MyImageProps) {

    const theme = useTheme()
    const mdDown = useMediaQuery(theme.breakpoints.down('md'))
    const smDown = useMediaQuery(theme.breakpoints.down('sm'))

    const [magnifyStyle, setMagnifyStyle] = useState({ backgroundImage: `url()` });

    useEffect(() => {
        setMagnifyStyle({ backgroundImage: `url(${src})` })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [src]);
    

    function handleMouseMove(e: MouseEvent<HTMLImageElement>){
        
        const { offsetX, offsetY } = e.nativeEvent
        
        const { clientX, clientY } = e

        const xPercentage = (offsetX / clientX) * 100
        const yPercentage = (offsetY / clientY) * 100

        setMagnifyStyle((prev) => {
            return {
                    ...prev, 
                    display: 'block',
                    backgroundPosition: `${xPercentage}% ${yPercentage}%`,
                    top: `${offsetY - 100}px`,
                    left: `${offsetX - 100}px`
                }
        })
        
    }

    function handleMouseLeave(_: React.MouseEvent<HTMLImageElement>){
        setMagnifyStyle((prev) => ({...prev, display: 'none'}))
    }

    return (
        <Box width='100%' display='flex' justifyContent='center' alignItems='center' height='100%'>
            <Box sx={{ position: 'relative', cursor: 'none' }}>
                <LazyLoadImage
                    alt={alt} 
                    src={src} 
                    width={smDown ? '140px' : mdDown ? '180px' : '220px' }
                    height='auto' 
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    draggable={false}
                />
                <Box
                    sx={{
                        display: 'none',
                        position: 'absolute',
                        backgroundRepeat: 'no-repeat',
                        border: '0.6px solid black',
                        width: '100px',
                        height: '100px',
                        backgroundSize: '300%',
                        backgroundPosition: 'center',
                        pointerEvents: 'none',
                        borderRadius: '50%',
                        ...magnifyStyle
                    }}
                >
                </Box>
            </Box>
        </Box>
    );
}
