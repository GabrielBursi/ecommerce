import { Box, Button, TextField, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";
import MaskedInput from "react-text-mask";
import { ModalCEP } from "../../Modal/ModalCEP";
import { MaskInputCep } from "../../Modal/utils";

export function SearchCep() {

    const theme = useTheme()
    const mdDown = useMediaQuery(theme.breakpoints.down('md'))

    const [cep, setCep] = useState<string>('');
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Box width='100%' height='150px' display='flex' justifyContent='center' alignItems='start' flexDirection='column' gap={1} >
            <Typography variant={mdDown ? "subtitle2" : "subtitle1"} color='black' fontWeight='bold'>
                Consultar frete e prazo de entrega
            </Typography>
            <Box display='flex' gap={1} height='40%'>
                <Box display='flex' justifyContent='center' alignItems='center' flex={1}>
                    <TextField
                        fullWidth
                        label='CEP'
                        placeholder='Insira o CEP'
                        value={cep}
                        onChange={(e) => setCep(e.target.value)}
                        InputProps={{
                            inputComponent: MaskedInput as any,
                            inputProps: {   
                                mask: MaskInputCep,
                                type: 'tel',
                            },
                        }}
                    />
                </Box>
                <Box display='flex' justifyContent='center' width='20%'>
                    <Button variant="outlined" fullWidth sx={{ fontSize: mdDown ? '1rem' : '1.2rem' }} onClick={() => cep.length === 9 && setIsOpen(true)}>
                        OK
                    </Button>
                </Box>
            </Box>
            <ModalCEP isOpen={isOpen} setIsOpen={setIsOpen} cep={cep} setCep={setCep}/>
        </Box>
    );
}
