import { createContext, useState } from "react";
import { CepOptions, ChildrenProp, CreditCardData } from "../types";

interface ResumeContextData {
    frete: number,
    setFrete: (value: number) => void,
    cepOptions: CepOptions[],
    setCepOptions: (value: CepOptions[]) => void,
    total: number,
    setTotal: (value: number) => void,
    someProducts: number, 
    setSomeProducts: (value: number) => void,
    payment: string, 
    setPayment: (value: string) => void,
    creditCardData: CreditCardData | undefined, 
    setCreditCardData: (value: CreditCardData) => void,
}

export const ResumeContext = createContext({} as ResumeContextData)

export function ResumeContextProvider({children}: ChildrenProp){

    const cepOptionsDefault: CepOptions[] = [
        { name: 'Rede Sul', rating: 5, price: 22.69, days: 4, selected: true },
        { name: 'Sedex', rating: 4.5, price: 23.12, days: 6, selected: false },
        { name: 'GFL', rating: 5, price: 30.24, days: 9, selected: false },
        { name: 'Correios PAC', rating: 4.5, price: 47.49, days: 5, selected: false },
    ]

    const [cepOptions, setCepOptions] = useState<CepOptions[]>(cepOptionsDefault);

    const [frete, setFrete] = useState<number>(0);

    const [total, setTotal] = useState<number>(0);
    const [someProducts, setSomeProducts] = useState<number>(0);

    const [payment, setPayment] = useState<string>('');
    const [creditCardData, setCreditCardData] = useState<CreditCardData>();

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
        }}>
            {children}
        </ResumeContext.Provider>
    )
}