import { useState } from "react";
import { Box, Radio, Rating, Typography } from "@mui/material";
import { CepOptions } from "../../types";

export function Cep({ days, name, price, rating, showInputRadio = false } :CepOptions) {

    const [isSelected, setIsSelected] = useState(false);

    function handleSelect(){
        setIsSelected(!isSelected)
    }

    return (
        <Box display='flex' justifyContent='space-between' alignItems='center'>
            <Box display='flex' height='100%' alignItems='center' justifyContent='center'>
                { showInputRadio &&
                    <Box display='flex' height='100%' alignItems='start' justifyContent='center'>
                        <Radio
                            checked={isSelected}
                            onClick={handleSelect}
                            size="small"
                            value={name}
                            name="radio-buttons"
                        />
                    </Box>
                }
                <Box display='flex' flexDirection='column' height='100%' alignItems='start' justifyContent='center'>
                    <Typography variant='subtitle1' color='black' fontWeight='bold'>
                        {name}
                    </Typography>
                    <Rating value={rating} precision={0.5} size='small' readOnly max={5} />
                </Box>
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