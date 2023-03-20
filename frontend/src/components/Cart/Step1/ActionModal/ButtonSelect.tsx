import { Button } from "@mui/material";
import { useContext } from "react";
import { AddressContext } from "../../../../contexts";
import { AddressFormData } from "../../../../types";

interface ButtonSelectProps {
    addressSelected: AddressFormData
}

export function ButtonSelect({ addressSelected }: ButtonSelectProps) {

    const { handleAddressSelect } = useContext(AddressContext)

    return (
        <Button onClick={() => handleAddressSelect(addressSelected)}>SELECIONAR ESTE</Button>
    );
}
