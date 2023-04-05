import { Box, Paper, Typography } from "@mui/material";
import SellIcon from '@mui/icons-material/Sell';
import { IProducts, MyImageProps } from "../../../types";
import { Carousel } from "../../Products/Carousel";
import { ActionsProduct, ImagemZoom, NameProduct } from "../../Products/ProductSelected";
import { PriceMobile } from "./PriceMobile";

interface ProductSelectedProps extends IProducts, MyImageProps { }


export function ProductSelectedMobile({ name, rating, alt, src, price, id, img }: ProductSelectedProps) {
    return (
        <Box component={Paper} width='100%' height='100%' padding={2} display='flex' flexDirection='column' gap={2}>
            <Box width='100%' display='flex' flexDirection='column' gap={2} flex={1}>
                <NameProduct name={name} /> 
                <ActionsProduct product={{ id, name, img, price, rating }} />
                <ImagemZoom alt={alt} src={src}/>
                <PriceMobile product={{ id, name, img, price, rating }}/>
            </Box>
            <Box width='100%' height='20%' display='flex' flexDirection='column'>
                <Box display='flex' justifyContent='start' alignItems='center' width='auto' gap={1}>
                    <SellIcon color="primary" sx={{ fontSize: '1rem' }} />
                    <Typography variant="subtitle2" color='black' fontWeight='bold' noWrap>
                        PRODUTOS SIMILARES
                    </Typography>
                </Box>
                <Carousel showMiniCard />
            </Box>

        </Box>
    );
}
