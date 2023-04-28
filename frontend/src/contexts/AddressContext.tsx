import { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Id, toast } from "react-toastify";
import { IAddress, ChildrenProp, IEditAddress } from "../types";
import { ServicesAddress } from "../services/api";
import { LoginContext } from "./LoginContext";
import { ShoppingContext } from "./ShoppingContext";

interface AddressContextData {
    createAddress: (newAddress: IAddress) => Promise<void | Id>,
    selectAddress: (cep: string) => Promise<void | Id>,
    editAddress: (cep: string, newAddressInfo: IEditAddress) => Promise<void | Id>
}
const AddressContext = createContext({} as AddressContextData)

function AddressContextProvider({ children }: ChildrenProp) {

    const navigate = useNavigate()
    const { isLogged } = useContext(LoginContext)
    const { setUserShop, userShop } = useContext(ShoppingContext)

    async function createAddress(newAddress: IAddress){
        if(!isLogged){
            return navigate('/login')
        }

        const address = await ServicesAddress.create(newAddress)

        if (address instanceof Error) {
            return toast.error(address.message, { position: 'top-center' })
        }

        if (userShop) {
            return setUserShop({ ...userShop, address })
        }
    }

    async function selectAddress(cep: string) {
        if(!isLogged){
            return navigate('/login')
        }

        const address = await ServicesAddress.select(cep)

        if (address instanceof Error) {
            return toast.error(address.message, { position: 'top-center' })
        }

        if (userShop) {
            return setUserShop({ ...userShop, address })
        }
    }

    async function editAddress(cep: string, newAddressInfo: IEditAddress) {
        if(!isLogged){
            return navigate('/login')
        }

        const address = await ServicesAddress.edit(cep, newAddressInfo)

        if (address instanceof Error) {
            return toast.error(address.message, { position: 'top-center' })
        }

        if (userShop) {
            return setUserShop({ ...userShop, address })
        }
    }

    return (
        <AddressContext.Provider 
            value={{ 
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