import { useContext, useState } from "react";
import { Box, IconButton, Paper, Typography } from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { HeaderContext } from "../../contexts";
import { CarouselBanner } from "./CarouselBanner";

interface BannerProps {
    name: string,
    showCarousel?: boolean
}

export function Banner({name, showCarousel = false}: BannerProps) {

    const { arrImgBanner } = useContext(HeaderContext)

    const [index, setIndex] = useState<number>(0);

    function goForward(){
        if(index === arrImgBanner.length - 1) return setIndex(0)
        setIndex(oldIndex => oldIndex + 1)
    }

    function goBack(){
        if (index === 0) return setIndex(arrImgBanner.length - 1)
        setIndex(oldIndex => oldIndex - 1)
    }

    return (
        <Box
            component={Paper}
            square
            elevation={2}
            sx={{
                width: '100%',
                height: 'auto',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            { !showCarousel &&
                <Typography variant="subtitle1" fontWeight='bold' color='black' mb={2}>
                    Você está em: {name}
                </Typography>
            }
            { showCarousel && 
                <Box
                    sx={{
                        width: '100%',
                        height: '300px',
                        display: 'flex'
                    }}
                >
                    <Box
                        sx={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <IconButton size="large" onClick={goBack}>
                            <ArrowBackIosIcon color="primary" fontSize="large"/>
                        </IconButton>
                    </Box>
                    <Box flex={1}>
                        <CarouselBanner alt={arrImgBanner[index].alt} src={arrImgBanner[index].src} to={arrImgBanner[index].to}/>
                    </Box>
                    <Box
                        sx={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <IconButton size="large" onClick={goForward}>
                            <ArrowForwardIosIcon color="primary" fontSize="large"/>
                        </IconButton>
                    </Box>
                    
                </Box>
            }
            <Box
                component={Paper}
                square
                elevation={0}
                sx={{
                    width: '100%',
                    height: '48px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#512da8'
                }}
            >
                <Typography variant="h5" fontWeight='bold' color='secondary'>
                    {name}
                </Typography>
            </Box>
        </Box>
    );
}
