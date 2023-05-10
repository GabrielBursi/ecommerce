import { useContext, useEffect } from "react";

import { Box, Divider, LinearProgress, Skeleton, Typography } from "@mui/material";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

import { Cep } from "../../CEP";
import { ResumeContext } from "../../../contexts";

export function ListOptionsCep() {

    const { getAllDeliveryOptions, deliveryOptions, isLoadingGetDeliveryOptions, isLoadingSelectDeliveryOptions } = useContext(ResumeContext)

    useEffect(() => {
        getOptions()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function getOptions() {
        await getAllDeliveryOptions();
    }

    return (
        <>
            <Divider />
            <Box height='auto' bgcolor='#fafafb' padding={2}>
                <Box display='flex' alignItems='center' gap={1} height='auto'>
                    <LocalShippingIcon color="primary" />
                    <Typography variant="h5" fontWeight='bold'>
                        FRETE:
                    </Typography>
                </Box>
                {isLoadingSelectDeliveryOptions && <LinearProgress color="primary" sx={{margin: '1%'}}/>}
                {isLoadingGetDeliveryOptions  ? 
                    <Skeleton variant="rectangular" width={'100%'} height={130} />
                    :
                    deliveryOptions?.map(option => (
                        <Cep
                            key={option.name}
                            days={option.days}
                            name={option.name}
                            price={option.price}
                            rating={option.rating}
                            selected={option.selected}
                            showInputRadio={true}
                        />
                    ))
                }
            </Box>
        </>
    );
}
