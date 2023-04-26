import { Button } from "@mui/material";
import { useContext } from "react";
import { AddressContext } from "../../../../contexts";
import { IAddress} from "../../../../types";

interface ButtonSelectProps {
    addressSelected: IAddress
}

export function ButtonSelect({ addressSelected }: ButtonSelectProps) {

    const { selectAddress } = useContext(AddressContext)

    return (
        <Button onClick={() => selectAddress(addressSelected.cep)}>SELECIONAR ESTE</Button>
    );
}
