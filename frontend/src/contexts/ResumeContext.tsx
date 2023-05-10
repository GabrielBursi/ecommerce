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
    setOrderNumber: (value: number) => void,
    isLoadingGetDeliveryOptions: boolean,
    isLoadingSelectDeliveryOptions: boolean,
}

export const ResumeContext = createContext({} as ResumeContextData)

export function ResumeContextProvider({children}: ChildrenProp){

    const { setUserShop, userShop } = useContext(ShoppingContext)

    const [deliveryOptions, setDeliveryOptions] = useState<IDelivery[]>();
    const [payment, setPayment] = useState<string>('');
    const [creditCardData, setCreditCardData] = useState<ICreditCard>();
    const [orderNumber, setOrderNumber] = useState<number | null>(null);
    const [isLoadingGetDeliveryOptions, setIsLoadingGetDeliveryOptions] = useState(false);
    const [isLoadingSelectDeliveryOptions, setIsLoadingSelectDeliveryOptions] = useState(false);

    async function getAllDeliveryOptions() {
        setIsLoadingGetDeliveryOptions(true)
        const options = await DeliveryServices.getAll()
        setIsLoadingGetDeliveryOptions(false)

        if(options instanceof Error){
            return toast.error(options.message, {position: 'top-center'})
        }
        setDeliveryOptions(options)
    }

    async function selectDeliveryOptions(name: string) {
        setIsLoadingSelectDeliveryOptions(true)
        const options = await DeliveryServices.select(name)
        setIsLoadingSelectDeliveryOptions(false)

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
            setOrderNumber,
            isLoadingGetDeliveryOptions,
            isLoadingSelectDeliveryOptions
        }}>
            {children}
        </ResumeContext.Provider>
    )
}