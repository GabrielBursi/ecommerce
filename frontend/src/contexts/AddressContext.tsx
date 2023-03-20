import { createContext, useState } from "react";
import { AddressFormData, ChildrenProp, AddressList } from "../types";

interface AddressContextData {
    formData: AddressFormData | undefined,
    setFormData: React.Dispatch<React.SetStateAction<AddressFormData | undefined>>,
    addressList: AddressList[],
    setAddressList: React.Dispatch<React.SetStateAction<AddressList[]>>,

    handleAddressSelect: (address: AddressFormData) => void,
}
const AddressContext = createContext({} as AddressContextData)

function AddressContextProvider({ children }: ChildrenProp) {
    
    const [formData, setFormData] = useState<AddressFormData>();
    const [addressList, setAddressList] = useState<AddressList[]>([]);

    function handleAddressSelect(addressSelected: AddressFormData) {
        setFormData(addressSelected);

        const updatedAddress = addressList.map((option) =>
            option.cep === addressSelected.cep ? { ...option, isSelected: true } : { ...option, isSelected: false }
        );

        setAddressList(updatedAddress);
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