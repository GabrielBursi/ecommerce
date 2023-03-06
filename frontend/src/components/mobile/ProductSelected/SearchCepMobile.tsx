import { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import InputMask from "react-input-mask";
import { ModalCEP } from "../../Modal/ModalCEP";


type CepOptions = {
    name: string,
    rating: number,
    price: string,
    days: number
}

export function SearchCepMobile() {


    const [cep, setCep] = useState<string>('');
    const [isOpen, setIsOpen] = useState(false);

    const cepOptions: CepOptions[] = [
        { name: 'Rede Sul', rating: 5, price: 'R$ 22,69', days: 4 },
        { name: 'Sedex', rating: 4.5, price: 'R$ 23,12', days: 6 },
        { name: 'GFL', rating: 5, price: 'R$ 30,24', days: 9 },
        { name: 'Correios PAC', rating: 4.5, price: 'R$ 47,49', days: 5 },
    ]

    return (
        <Box width='100%' height='100px' display='flex' justifyContent='center' alignItems='start' flexDirection='column' gap={1}>
            <Typography variant='subtitle2' color='black' fontWeight='bold'>
                Consultar frete e prazo de entrega
            </Typography>
            <Box display='flex' gap={1} height='60%' width='100%'>
                <Box display='flex' justifyContent='center' alignItems='center' flex={1}>
                    <InputMask
                        mask="99999-999"
                        value={cep}
                        maskPlaceholder="_____-___"
                        onChange={(e) => setCep(e.target.value)}
                    >
                        <TextField placeholder='Insira o CEP' fullWidth/>
                    </InputMask>
                </Box>
                <Box display='flex' justifyContent='center' width='20%'>
                    <Button variant="outlined" fullWidth sx={{ fontSize: '1rem' }} onClick={() => cep.length === 9 && setIsOpen(true)}>
                        OK
                    </Button>
                </Box>
            </Box>
            <ModalCEP isOpen={isOpen} setIsOpen={setIsOpen} cep={cep} setCep={setCep} cepOptions={cepOptions} />
        </Box>
    );
}
