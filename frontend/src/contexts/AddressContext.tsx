import { createContext, useState } from "react";
import { IAddress, ChildrenProp } from "../types";

interface AddressContextData {
    formData: IAddress| undefined,
    setFormData: React.Dispatch<React.SetStateAction<IAddress| undefined>>,
    addressList: IAddress[],
    setAddressList: React.Dispatch<React.SetStateAction<IAddress[]>>,

    handleAddressSelect: (address: IAddress| undefined) => void,
}
const AddressContext = createContext({} as AddressContextData)

function AddressContextProvider({ children }: ChildrenProp) {
    
    const [formData, setFormData] = useState<IAddress>();
    const [addressList, setAddressList] = useState<IAddress[]>([]);

    function handleAddressSelect(addressSelected: IAddress| undefined) {
        if(addressSelected){
            setFormData(addressSelected);
            if(addressList.length > 0){
    
                const updatedAddress: IAddress[] = addressList.map((option) => {
                    
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