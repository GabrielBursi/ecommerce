import { useContext, useState } from "react";
import { Button } from "@mui/material";
import { AddressContext } from "../../../../contexts";
import { ModalAddress } from "../../../Modal";

export function ButtonEdit() {

    const { addressList } = useContext(AddressContext)

    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <ModalAddress
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                title='EDITAR ENDEREÇO'
                btnText='ATUALIZAR ENDEREÇO'
                isNewAddress={false}
            />
            <Button 
                disabled={addressList.length === 0} 
                onClick={() => setIsOpen(true)}
            >
                EDITAR
            </Button>
        </>
    );
}
