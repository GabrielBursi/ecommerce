import { useContext, useState } from "react";
import { Button } from "@mui/material";
import { AddressContext, ShoppingContext } from "../../../../contexts";
import { ModalAddressList } from "../../../Modal";

export function ButtonList() {
    const { userShop } = useContext(ShoppingContext)
    const { isLoading } = useContext(AddressContext)

    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <ModalAddressList
                isOpen={isOpen}
                setIsOpen={setIsOpen}
            />
            <Button 
                disabled={userShop!.address.length <= 1 || isLoading}
                onClick={() => {setIsOpen(true)}}
            >
                SELECIONAR OUTRO
            </Button>
        </>
    );
}
