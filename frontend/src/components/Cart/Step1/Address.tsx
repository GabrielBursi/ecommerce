import { useContext, useState } from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { ModalAddress } from "../../Modal";
import { AddressContext } from "../../../contexts";

export function Address() {

    const [isOpen, setIsOpen] = useState(false);
    const [isNewAddress, setIsNewAddress] = useState(false);

    const { formData } = useContext(AddressContext)

    return (
        <Box height='40%' component={Paper} elevation={2} padding={2} display='flex' flexDirection='column' gap={2}>
            <ModalAddress 
                isOpen={isOpen} 
                setIsOpen={setIsOpen}
                title={ isNewAddress ? 'NOVO ENDEREÇO' : 'EDITAR ENDEREÇO' }
                btnText={ isNewAddress ? "CADASTRAR ENDEREÇO" : "ATUALIZAR ENDEREÇO" }
                isNewAddress={isNewAddress}
            />
            <Box display='flex' alignItems='center' gap={1} height='auto'>
                <LocationOnIcon color="primary"/>
                <Typography variant="h5" fontWeight='bold'>
                    SELECIONE O ENDEREÇO
                </Typography>
            </Box>
            <Box flex={1} bgcolor='#fafafb' display='flex' flexDirection='column' padding={1} borderLeft='2px solid #4527a0' borderRadius={0.5}>
                <Box flex={1} display='flex' flexDirection='column' padding={2}>
                    <Typography variant="subtitle1">
                        {formData?.street}
                    </Typography>
                    <Typography variant="subtitle1">
                        Número: {formData?.number}, {formData?.complement}
                    </Typography>
                    <Typography variant="subtitle1">
                        CEP {formData?.cep} - {formData?.city}, {formData?.state}
                    </Typography>
                </Box>
                <Box height='20%' display='flex' alignItems='center' justifyContent='end' gap={1}>
                    <Button onClick={() => {setIsOpen(true); setIsNewAddress(false)}}>EDITAR</Button>
                    <Button>SELECIONAR OUTRO</Button>
                    <Button onClick={() => {setIsOpen(true); setIsNewAddress(true)}}>NOVO ENDEREÇO</Button>
                </Box>
            </Box>
        </Box>
    );
}
