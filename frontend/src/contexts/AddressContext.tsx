import { createContext, useState } from "react";
import { AddressFormData, ChildrenProp } from "../types";

interface AddressContextData {
    formData: AddressFormData | undefined,
    setFormData: React.Dispatch<React.SetStateAction<AddressFormData | undefined>>,
    addressList: AddressFormData[],
    setAddressList: React.Dispatch<React.SetStateAction<AddressFormData[]>>,
}
const AddressContext = createContext({} as AddressContextData)

function AddressContextProvider({ children }: ChildrenProp) {
    
    const [formData, setFormData] = useState<AddressFormData>();
    const [addressList, setAddressList] = useState<AddressFormData[]>([]);

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