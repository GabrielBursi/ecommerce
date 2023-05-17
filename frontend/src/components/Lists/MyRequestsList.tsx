import { Box, Typography } from "@mui/material"
import { IProducts } from "../../types"
import { MyImage } from "../Products"

export const MyRequestsList = ({ img, name, price, quant }: IProducts) => {

    const brand = name.split(' ')[0]
    const nameWithoutBrand = name.replace(name.split(' ')[0], '')

    return (
        <Box width='100%' height='160px' display='flex' alignItems='center' justifyContent='space-between'>
            <Box width='100%' height='160px' display='flex' alignItems='center' gap={2}>
                <Box width='auto' minWidth='10%' height='auto' maxHeight='200px' display='flex' alignItems='center' justifyContent='center'>
                    <MyImage alt={name} src={img} height='auto' width='100px' />
                </Box>
                <Box flex={1} maxWidth='500px' height='100%' display='flex' flexDirection='column'>
                    <Typography component='span' variant='subtitle1' fontWeight="light">
                        {brand}
                    </Typography>
                    <Typography
                        component='h1'
                        variant='h6'
                        sx={{ cursor: 'pointer', wordBreak: 'break-word', display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical" }}
                        color='black'
                        fontWeight="bold"
                        overflow='hidden'
                        textOverflow="ellipsis"
                    >
                        {nameWithoutBrand}
                    </Typography>
                    <Typography component='span' variant='subtitle1' fontWeight="light">
                        Quantidade: {quant}
                    </Typography>
                </Box>
            </Box>
            <Box width='15%' height='100%' display='flex' alignItems='center' justifyContent='center' flexDirection='column'>
                {quant && quant > 1 &&
                    <Typography color='black' variant='body2' fontWeight='light'>
                        {quant}x {price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </Typography>
                }
                <Typography color='primary' variant='h5' fontWeight='bold'>
                    {(Number(price) * (quant || 1)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </Typography>
            </Box>
        </Box>
    )
}
