import { useContext, useEffect, useState } from "react";
import { Button } from "@mui/material";
import { AddressContext } from "../../../../contexts";
import { ModalAddress } from "../../../Modal";
import { AddressFormData } from "../../../../types";

interface ButtonEditProps {
    cep:string | undefined;
}

export function ButtonEdit({ cep }: ButtonEditProps) {

    const { addressList } = useContext(AddressContext)

    const [isOpen, setIsOpen] = useState(false);
    const [addressFind, setAddressFind] = useState<AddressFormData>();

    useEffect(() => {
        const addressFindByFilter = addressList.find(address =>  address.cep === cep)
        setAddressFind(addressFindByFilter)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cep]);

    return (
        <>
            <ModalAddress
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                title='EDITAR ENDEREÇO'
                btnText='ATUALIZAR ENDEREÇO'
                isNewAddress={false}
                addressFind={addressFind}
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
