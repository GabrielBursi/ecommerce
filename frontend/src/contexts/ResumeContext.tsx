import { createContext, useState } from "react";
import { ICep, ChildrenProp, ICreditCard} from "../types";

interface ResumeContextData {
    frete: number,
    setFrete: (value: number) => void,
    cepOptions: ICep[],
    setCepOptions: (value: ICep[]) => void,
    total: number,
    setTotal: (value: number) => void,
    someProducts: number, 
    setSomeProducts: (value: number) => void,
    payment: string, 
    setPayment: (value: string) => void,
    creditCardData: ICreditCard| undefined, 
    setCreditCardData: (value: ICreditCard) => void,
    orderNumber: number | null, 
    setOrderNumber: (value: number) => void
}

export const ResumeContext = createContext({} as ResumeContextData)

export function ResumeContextProvider({children}: ChildrenProp){

    const cepOptionsDefault: ICep[] = [
        { name: 'Rede Sul', rating: 5, price: 22.69, days: 4, selected: true },
        { name: 'Sedex', rating: 4.5, price: 23.12, days: 6, selected: false },
        { name: 'GFL', rating: 5, price: 30.24, days: 9, selected: false },
        { name: 'Correios PAC', rating: 4.5, price: 47.49, days: 5, selected: false },
    ]

    const [cepOptions, setCepOptions] = useState<ICep[]>(cepOptionsDefault);

    const [frete, setFrete] = useState<number>(0);

    const [total, setTotal] = useState<number>(0);
    const [someProducts, setSomeProducts] = useState<number>(0);

    const [payment, setPayment] = useState<string>('');
    const [creditCardData, setCreditCardData] = useState<ICreditCard>();

    const [orderNumber, setOrderNumber] = useState<number | null>(null);

    return (
        <ResumeContext.Provider value={{
            cepOptions,
            setCepOptions,
            frete,
            setFrete,
            total, 
            setTotal,
            someProducts, 
            setSomeProducts,
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