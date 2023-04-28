import { useContext, useEffect, useState } from "react";
import { Box, Paper, Stack, Typography } from "@mui/material";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { InfoAddress } from "./InfoAddress";
import { ShoppingContext } from "../../../contexts";
import { ButtonEdit, ButtonList, ButtonNew } from "./ActionModal";
import { IAddress } from "../../../types";

export function Address() {

    const { userShop } = useContext(ShoppingContext)

    const [address, setAddress] = useState<IAddress>();
    
    useEffect(() => {
        const addressSelected = userShop?.address.find(ads => ads.isSelected === true)
        setAddress(addressSelected)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userShop?.address]);

    return (
        <Box height='40%' component={Paper} elevation={2} padding={2} display='flex' flexDirection='column' gap={2}>
            <Box display='flex' alignItems='center' gap={1} height='auto'>
                <LocationOnIcon color="primary"/>
                <Typography variant="h5" fontWeight='bold'>
                    SELECIONE O ENDEREÇO
                </Typography>
            </Box>
            <Box flex={1} bgcolor='#fafafb' display='flex' flexDirection='column' padding={1} borderLeft='2px solid #4527a0' borderRadius={0.5}>
                <InfoAddress  address={address}/>
                <Box height='20%' display='flex' alignItems='center' justifyContent='end'>
                    <Stack direction='row' spacing={2}>
                        <ButtonEdit address={address}/>
                        <ButtonList />
                        <ButtonNew />
                    </Stack>
                </Box>
            </Box>
        </Box>
    );
}
