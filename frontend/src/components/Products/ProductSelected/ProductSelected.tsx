import { Box, Paper, Typography, useMediaQuery, useTheme } from "@mui/material";
import SellIcon from '@mui/icons-material/Sell';
import { ActionsProduct, ImagemZoom, NameProduct, Price, SearchCep } from ".";
import { Carousel } from "../Carousel";
import { IProducts, MyImageProps } from "../../../types";
import { ProductSelectedMobile } from "../../mobile";


interface ProductSelectedProps extends IProducts, MyImageProps {}

export function ProductSelected({ name, rating, alt, src, price, id, img }: ProductSelectedProps) {

    const theme = useTheme()
    const mdDown = useMediaQuery(theme.breakpoints.down('md'))
    const smDown = useMediaQuery(theme.breakpoints.down('sm'))
    const lgDown = useMediaQuery(theme.breakpoints.down('lg'))

    if(smDown)
    return <ProductSelectedMobile
                alt={name}
                src={img}
                id={id}
                img={img}
                price={price}
                rating={rating}
                name={name}
            />

    return (
        <Box component={Paper} elevation={2} width={lgDown ? '100%' : '70%'} height='80%' display='flex' flexDirection='column' padding={2}>
            <NameProduct name={name}/> 
            <Box flex={1} width='100%' display='flex'>
                <Box flex={1} display='flex' flexDirection='column'>
                    <Box flex={1} width='100%' display='flex' flexDirection='column'>
                        <ActionsProduct 
                            product={{id, name, img, price, rating}} 
                        /> 
                        <Box flex={1} width='100%' display='flex'>
                            { !lgDown &&
                                <Box width='60px' border='1px solid black'>

                                </Box>
                            }
                            <ImagemZoom alt={alt} src={src} /> 
                        </Box>
                    </Box>
                    <SearchCep/> 
                </Box>
                <Box width='50%' display='flex' flexDirection='column'>
                    <Box flex={1} width='100%' display='flex' flexDirection='column'>
                        <Price 
                            product={{ id, name, img, price, rating }}
                        />
                        <Box height='20%' display='flex' alignItems='end'>
                            <Box display='flex' justifyContent='start' alignItems='center' width='auto' gap={1}>
                                <SellIcon color="primary" sx={{ fontSize: '1rem' }} />
                                <Typography variant={mdDown ? "subtitle2" : "subtitle1"} color='black' fontWeight='bold' noWrap>
                                    PRODUTOS SIMILARES
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                    <Box width='620px' height='150px'>
                        <Carousel showMiniCard />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
