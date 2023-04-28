import { Button } from "@mui/material";
import { useContext } from "react";
import { AddressContext } from "../../../../contexts";
import { IAddress} from "../../../../types";

interface ButtonSelectProps {
    address: IAddress | undefined;
}

export function ButtonSelect({ address }: ButtonSelectProps) {

    const { selectAddress } = useContext(AddressContext)

    return (
        <Button onClick={async () => await selectAddress(address?.cep || '')}>SELECIONAR ESTE</Button>
    );
}
