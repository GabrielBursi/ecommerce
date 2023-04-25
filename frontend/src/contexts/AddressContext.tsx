import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Id, toast } from "react-toastify";
import { IAddress, ChildrenProp, IEditAddress } from "../types";
import { LoginContext } from "./LoginContext";
import { ServicesAddress } from "../services/api";

interface AddressContextData {
    addressData: IAddress| undefined,
    setAddressData: React.Dispatch<React.SetStateAction<IAddress| undefined>>,
    addressList: IAddress[],
    setAddressList: React.Dispatch<React.SetStateAction<IAddress[]>>,

    createAddress: (newAddress: IAddress) => Promise<void | Id>,
    selectAddress: (cep: string) => Promise<void | Id>,
    editAddress: (cep: string, newAddressInfo: IEditAddress) => Promise<void | Id>
}
const AddressContext = createContext({} as AddressContextData)

function AddressContextProvider({ children }: ChildrenProp) {
    
    const [addressData, setAddressData] = useState<IAddress>();
    const [addressList, setAddressList] = useState<IAddress[]>([]);

    const navigate = useNavigate()
    const { isLogged } = useContext(LoginContext)

    async function createAddress(newAddress: IAddress){
        if(!isLogged){
            return navigate('/login')
        }

        const address = await ServicesAddress.create(newAddress)

        if (address instanceof Error) {
            return toast.error(address.message, { position: 'top-center' })
        }

        setAddressData(address[address.length - 1])
        setAddressList(address)
    }

    async function selectAddress(cep: string) {
        if(!isLogged){
            return navigate('/login')
        }

        const address = await ServicesAddress.select(cep)

        if (address instanceof Error) {
            return toast.error(address.message, { position: 'top-center' })
        }

        const addressSelected = address.find(ads => ads.isSelected === true)

        setAddressData(addressSelected)
        setAddressList(address)
    }

    async function editAddress(cep: string, newAddressInfo: IEditAddress) {
        if(!isLogged){
            return navigate('/login')
        }

        const address = await ServicesAddress.edit(cep, newAddressInfo)

        if (address instanceof Error) {
            return toast.error(address.message, { position: 'top-center' })
        }

        const addressSelected = address.find(ads => ads.isSelected === true)

        setAddressData(addressSelected)
        setAddressList(address)
    }

    return (
        <AddressContext.Provider 
            value={{ 
                addressData, 
                setAddressData, 
                addressList, 
                setAddressList, 
                createAddress,
                editAddress,
                selectAddress
            }}
        >
            {children}
        </AddressContext.Provider>
    );
}

export {
    AddressContext ,
    AddressContextProvider
}