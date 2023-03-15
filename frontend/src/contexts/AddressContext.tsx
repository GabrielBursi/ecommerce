import { createContext, useState } from "react";
import { ChildrenProp } from "../types";

interface AddressContextData {
    formData: FormData | undefined,
    setFormData: React.Dispatch<React.SetStateAction<FormData | undefined>>
}

type FormData = {
    complement?: string | undefined;
    ref?: string | undefined;
    city?: string | undefined;
    state?: string | undefined;
    number: string;
    cep: string;
    identification: string;
    street: string;
    neighborhood: string;
}

const AddressContext = createContext({} as AddressContextData)

function AddressContextProvider({ children }: ChildrenProp) {
    
    const [formData, setFormData] = useState<FormData>();

    return (
        <AddressContext.Provider value={{ formData, setFormData }}>
            {children}
        </AddressContext.Provider>
    );
}

export {
    AddressContext ,
    AddressContextProvider
}