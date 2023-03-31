import { useContext } from "react";
import { Box, Typography } from "@mui/material";
import { ButtonEdit, ButtonSelect } from "./ActionModal";
import { AddressContext } from "../../../contexts";
import { AddressFormData } from "../../../types";

interface InfoAddressProps extends Omit<AddressFormData, | 'neighborhood'> {
    isOnModal?: boolean,
    isSelected?: boolean
}

export function InfoAddress({ street, complement, number, cep, city, state, identification, isOnModal = false, isSelected }: InfoAddressProps) {

    const { addressList } = useContext(AddressContext)

    return (
        <Box flex={1} display='flex' flexDirection='column' padding={2} bgcolor={isOnModal ? '#fafafb' : ''} borderLeft={isSelected ? '2px solid #4527a0' : ''}>
            {addressList.length === 0 ?
                <Typography variant="subtitle1">
                    Nenhum endereço cadastrado
                </Typography>
                :
                <>
                    <Typography variant="subtitle1" fontWeight='bold' fontSize='1.1rem'>
                        {identification}
                    </Typography>
                    <Typography variant="subtitle1">
                        {street}
                    </Typography>
                    <Typography variant="subtitle1">
                        Número: {number}, {complement}
                    </Typography>
                    <Typography variant="subtitle1">
                        CEP {cep} - {city}, {state}
                    </Typography>
                    { isOnModal && 
                    
                        <Box height='20%' display='flex' alignItems='center' justifyContent='end' gap={1}>
                            <ButtonEdit cep={cep}/>
                            {!isSelected && <ButtonSelect addressSelected={{ street, complement, number, cep, city, state, identification, neighborhood: '', isSelected: true }}/>}
                        </Box>
                    }
                </>
            }
        </Box>
    );
}
