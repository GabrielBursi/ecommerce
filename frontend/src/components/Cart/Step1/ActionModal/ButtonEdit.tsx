import { useContext, useState } from "react";
import { Button } from "@mui/material";
import { AddressContext, ShoppingContext } from "../../../../contexts";
import { ModalAddress } from "../../../Modal";
import { IAddress} from "../../../../types";

interface ButtonEditProps {
    address: IAddress | undefined
}

export function ButtonEdit({ address }: ButtonEditProps) {

    const { userShop } = useContext(ShoppingContext)
    const { isLoading } = useContext(AddressContext)

    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <ModalAddress
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                title='EDITAR ENDEREÇO'
                btnText='ATUALIZAR ENDEREÇO'
                isNewAddress={false}
                addressFind={address}
            />
            <Button 
                disabled={userShop?.address.length === 0 || isLoading} 
                onClick={() => setIsOpen(true)}
            >
                EDITAR
            </Button>
        </>
    );
}
