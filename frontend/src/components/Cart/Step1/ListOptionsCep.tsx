import { useContext, useState } from "react";

import { Box, Divider, Typography } from "@mui/material";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

import { Cep } from "../../CEP";
import { ResumeContext } from "../../../contexts";
import { IDelivery } from "../../../types";

export function ListOptionsCep() {

    const { cepOptions, setCepOptions } = useContext(ResumeContext)

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, setSelectedOption] = useState<IDelivery>();

    function handleOptionSelect(optionSelected: IDelivery) {
        setSelectedOption(optionSelected);

        const updatedOptions = cepOptions.map((option) =>
            option.name === optionSelected.name ? { ...option, selected: true } : { ...option, selected: false }
        );

        setCepOptions(updatedOptions);
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
                {cepOptions.map(option => (
                    <Cep
                        key={option.name}
                        days={option.days}
                        name={option.name}
                        price={option.price}
                        rating={option.rating}
                        selected={option.selected}
                        onchange={handleOptionSelect}
                        showInputRadio={true}
                    />
                ))
                }
            </Box>
        </>
    );
}
