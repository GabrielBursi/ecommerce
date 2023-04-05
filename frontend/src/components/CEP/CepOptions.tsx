import { useContext, useEffect } from "react";
import { Box, Radio, Rating, Typography } from "@mui/material";
import { CepOptions } from "../../types";
import { ResumeContext } from "../../contexts";

interface CepProps extends CepOptions{
    showInputRadio?: boolean,
    onchange?: (value: CepOptions) => void;
}

export function Cep({ days, name, price, rating, selected, showInputRadio = false, onchange }: CepProps) {

    const { cepOptions, setFrete } = useContext(ResumeContext)

    useEffect(() => {
        const nameFindArr = cepOptions.filter(option => option.selected === true)
        const [ nameFind ] = nameFindArr
        setFrete(nameFind.price)
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selected]);

    return (
        <Box display='flex' justifyContent='space-between' alignItems='center'>
            <Box display='flex' height='100%' alignItems='center' justifyContent='center'>
                { showInputRadio &&
                    <Box display='flex' height='100%' alignItems='start' justifyContent='center'>
                        <Radio
                            checked={selected}
                            onChange={(_e, _c) => {onchange && onchange({days, name, price, selected, rating})}}
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
                    {price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </Typography>
                <Typography variant='subtitle2' color='black' fontWeight='light'>
                    até {days} dias úteis
                </Typography>
            </Box>

        </Box>
    );
}