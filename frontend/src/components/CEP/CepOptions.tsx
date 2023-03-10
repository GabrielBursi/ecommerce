import { Box, Rating, Typography } from "@mui/material";
import { CepOptions } from "../../types";

export function Cep({ days, name, price, rating } :CepOptions) {
    return (
        <Box key={name} display='flex' justifyContent='space-between' alignItems='center' mb={2}>
            <Box display='flex' flexDirection='column' height='100%' alignItems='start' justifyContent='center'>
                <Typography variant='subtitle1' color='black' fontWeight='bold'>
                    {name}
                </Typography>
                <Rating value={rating} precision={0.5} size='small' readOnly max={5} />
            </Box>
            <Box display='flex' flexDirection='column' height='100%' alignItems='start' justifyContent='center'>
                <Typography variant='subtitle1' color='black' fontWeight='bold'>
                    {price}
                </Typography>
                <Typography variant='subtitle2' color='black' fontWeight='light'>
                    até {days} dias úteis
                </Typography>
            </Box>

        </Box>
    );
}