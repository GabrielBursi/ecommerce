import { createContext, useState } from "react";
import { CepOptions, ChildrenProp } from "../types";

interface ResumeContextData {
    frete: number,
    setFrete: (value: number) => void,
    cepOptions: CepOptions[],
    setCepOptions: (value: CepOptions[]) => void,
    total: number,
    setTotal: (value: number) => void,
    someProducts: number, 
    setSomeProducts: (value: number) => void,
}

export const ResumeContext = createContext({} as ResumeContextData)

export function ResumeContextProvider({children}: ChildrenProp){

    const cepOptionsDefault: CepOptions[] = [
        { name: 'Rede Sul', rating: 5, price: 'R$ 22,69', days: 4 },
        { name: 'Sedex', rating: 4.5, price: 'R$ 23,12', days: 6 },
        { name: 'GFL', rating: 5, price: 'R$ 30,24', days: 9 },
        { name: 'Correios PAC', rating: 4.5, price: 'R$ 47,49', days: 5 },
    ]

    const [cepOptions, setCepOptions] = useState<CepOptions[]>(cepOptionsDefault);

    const [frete, setFrete] = useState<number>(0);

    const [total, setTotal] = useState<number>(0);
    const [someProducts, setSomeProducts] = useState<number>(0);

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
        }}>
            {children}
        </ResumeContext.Provider>
    )
}