import { useContext } from "react";
import { Box, Typography } from "@mui/material";
import { ButtonEdit, ButtonSelect } from "./ActionModal";
import { ShoppingContext } from "../../../contexts";
import { IAddress} from "../../../types";

interface InfoAddressProps {
    address: IAddress | undefined,
    isOnModal?: boolean,
}

export function InfoAddress({ address, isOnModal }: InfoAddressProps) {

    const { userShop } = useContext(ShoppingContext)

    return (
        <Box flex={1} display='flex' flexDirection='column' padding={2} bgcolor={isOnModal ? '#fafafb' : ''} borderLeft={address?.isSelected && isOnModal ? '2px solid #4527a0' : ''}>
            {userShop?.address?.length === 0 ?
                <Typography variant="subtitle1">
                    Nenhum endereço cadastrado
                </Typography>
                :
                <>
                    <Typography variant="subtitle1" fontWeight='bold' fontSize='1.1rem'>
                        {address?.identification}
                    </Typography>
                    <Typography variant="subtitle1">
                        {address?.street}
                    </Typography>
                    <Typography variant="subtitle1">
                        Número: {address?.number}, {address?.complement}
                    </Typography>
                    <Typography variant="subtitle1">
                        CEP {address?.cep} - {address?.city}, {address?.state}
                    </Typography>
                    { isOnModal && 
                    
                        <Box height='20%' display='flex' alignItems='center' justifyContent='end' gap={1}>
                            <ButtonEdit address={address}/>
                            {!address?.isSelected && <ButtonSelect address={address}/>}
                        </Box>
                    }
                </>
            }
        </Box>
    );
}
