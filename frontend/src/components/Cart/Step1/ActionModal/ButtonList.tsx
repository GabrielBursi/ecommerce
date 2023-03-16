import { useContext, useState } from "react";
import { Button } from "@mui/material";
import { AddressContext } from "../../../../contexts";
import { ModalAddressList } from "../../../Modal";

export function ButtonList() {
    const { addressList } = useContext(AddressContext)

    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <ModalAddressList
                isOpen={isOpen}
                setIsOpen={setIsOpen}
            />
            <Button 
                disabled={addressList.length === 0}
                onClick={() => setIsOpen(true)}
            >
                SELECIONAR OUTRO
            </Button>
        </>
    );
}
