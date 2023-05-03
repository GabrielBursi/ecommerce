import { createContext, useContext, useState } from "react";
import { Id, toast } from "react-toastify";
import { IDelivery, ChildrenProp, ICreditCard} from "../types";
import { DeliveryServices } from "../services/api";
import { ShoppingContext } from "./ShoppingContext";

interface ResumeContextData {
    getAllDeliveryOptions: () => Promise<Id | undefined>,
    selectDeliveryOptions: (name: string) => Promise<Id | undefined>,
    deliveryOptions: IDelivery[] | undefined,
    payment: string, 
    setPayment: (value: string) => void,
    creditCardData: ICreditCard| undefined, 
    setCreditCardData: (value: ICreditCard) => void,
    orderNumber: number | null, 
    setOrderNumber: (value: number) => void
}

export const ResumeContext = createContext({} as ResumeContextData)

export function ResumeContextProvider({children}: ChildrenProp){

    const { setUserShop, userShop } = useContext(ShoppingContext)

    const [deliveryOptions, setDeliveryOptions] = useState<IDelivery[]>();
    const [payment, setPayment] = useState<string>('');
    const [creditCardData, setCreditCardData] = useState<ICreditCard>();
    const [orderNumber, setOrderNumber] = useState<number | null>(null);


    async function getAllDeliveryOptions() {
        const options = await DeliveryServices.getAll()

        if(options instanceof Error){
            return toast.error(options.message, {position: 'top-center'})
        }
        setDeliveryOptions(options)
    }

    async function selectDeliveryOptions(name: string) {
        const options = await DeliveryServices.select(name)

        if (options instanceof Error) {
            return toast.error(options.message, { position: 'top-center' })
        }

        setDeliveryOptions(options.options)
        if(userShop){
            setUserShop({...userShop, cart: { ...userShop?.cart, total: options.total }})
        }
    }
    
    return (
        <ResumeContext.Provider value={{
            deliveryOptions,
            getAllDeliveryOptions,
            selectDeliveryOptions,
            payment, 
            setPayment,
            creditCardData, 
            setCreditCardData,
            orderNumber, 
            setOrderNumber
        }}>
            {children}
        </ResumeContext.Provider>
    )
}