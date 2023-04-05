import { useState } from "react";
import { Button } from "@mui/material";
import { ModalAddress } from "../../../Modal";

export function ButtonNew() {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <ModalAddress
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                title='NOVO ENDEREÇO'
                btnText='CADASTRAR ENDEREÇO'
            />
            <Button onClick={() => setIsOpen(true)}>NOVO ENDEREÇO</Button>
        </>
    );
}
