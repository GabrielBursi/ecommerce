import { createContext, useState } from "react";
import { AddressFormData, ChildrenProp } from "../types";

interface AddressContextData {
    formData: AddressFormData | undefined,
    setFormData: React.Dispatch<React.SetStateAction<AddressFormData | undefined>>,
    addressList: AddressFormData[],
    setAddressList: React.Dispatch<React.SetStateAction<AddressFormData[]>>,

    handleAddressSelect: (address: AddressFormData | undefined) => void,
}
const AddressContext = createContext({} as AddressContextData)

function AddressContextProvider({ children }: ChildrenProp) {
    
    const [formData, setFormData] = useState<AddressFormData>();
    const [addressList, setAddressList] = useState<AddressFormData[]>([]);

    function handleAddressSelect(addressSelected: AddressFormData | undefined) {
        if(addressSelected){
            setFormData(addressSelected);
            if(addressList.length > 0){
    
                const updatedAddress: AddressFormData[] = addressList.map((option) => {
                    
                    return option.cep === addressSelected.cep ? { ...option, isSelected: true } : { ...option, isSelected: false }
                });
                
                setAddressList(updatedAddress);
            }
        }
    }

    return (
        <AddressContext.Provider value={{ formData, setFormData, addressList, setAddressList, handleAddressSelect }}>
            {children}
        </AddressContext.Provider>
    );
}

export {
    AddressContext ,
    AddressContextProvider
}