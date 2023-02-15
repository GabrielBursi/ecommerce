import { Box, Divider, Paper } from "@mui/material";
import { IProducts } from "../../types";

export function ListFavorites({ name, img, description, price, rating }: IProducts) {
    return (
        <Box component={Paper} display='flex' alignItems='center' width='100%' height='30%' padding={2} gap={1}>

            <Box display='flex' alignItems='center' justifyContent='space-between' width='60%' height='100%' gap={1}>
                <Box border='1px solid black' width='20%' height='100%'>
                    {img}
                </Box>
                <Box border='1px solid black' flex={1} height='100%'>
                    {name}, {description} e {rating}
                </Box>
            </Box>
            <Divider orientation="vertical" flexItem />
            <Box flex={1} height='100%' display='flex' alignItems='center' justifyContent='space-between' gap={1}>
                <Box border='1px solid black' width='30%' height='100%'>
                    {price}
                </Box>
                <Box border='1px solid black' flex={1} height='100%'>
                    botao para comprar e para tirar dos favoritos
                </Box>
            </Box>
        </Box>
    );
}