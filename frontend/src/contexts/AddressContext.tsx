import { createContext, useState } from "react";
import { ChildrenProp } from "../types";

interface AddressContextData {
    formData: FormData | undefined,
    setFormData: React.Dispatch<React.SetStateAction<FormData | undefined>>,
    addressList: FormData[],
    setAddressList: React.Dispatch<React.SetStateAction<FormData[]>>,
}

type FormData = {
    complement?: string;
    ref?: string;
    city?: string;
    state?: string;
    number: string;
    cep: string;
    identification: string;
    street: string;
    neighborhood: string;
}

const AddressContext = createContext({} as AddressContextData)

function AddressContextProvider({ children }: ChildrenProp) {
    
    const [formData, setFormData] = useState<FormData>();
    const [addressList, setAddressList] = useState<FormData[]>([]);

    return (
        <AddressContext.Provider value={{ formData, setFormData, addressList, setAddressList }}>
            {children}
        </AddressContext.Provider>
    );
}

export {
    AddressContext ,
    AddressContextProvider
}