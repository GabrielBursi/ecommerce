import { createContext, useState } from "react";
import { ChildrenProp, IUserShopData } from "../types";
import { ServicesUsers } from "../services/api";

interface ShoppingContextData{
    userShop: IUserShopData | null, 
    setUserShop: (userShop: IUserShopData | null) => void,
    getUserShopData: () => Promise<true | Error>
}

const ShoppingContext = createContext({} as ShoppingContextData)

function ShoppingContextProvider({children}:ChildrenProp) {

    const [userShop, setUserShop] = useState<IUserShopData | null>(null);

    async function getUserShopData() {
        const email = localStorage.getItem('email')
        const accessToken = localStorage.getItem('accessToken')

        if(!email || !accessToken){
            return new Error('Email ou accessToken não encontrado no LocalStorage')
        }

        const user = await ServicesUsers.getByEmail(JSON.parse(email), JSON.parse(accessToken))

        if(user instanceof Error){
            return new Error(user.message)
        }
        
        setUserShop(user.user);
        return true
    }

    return (
        <ShoppingContext.Provider value={{ 
            userShop, 
            setUserShop,
            getUserShopData
        }}>
            {children}
        </ShoppingContext.Provider>
    );
}

export {
    ShoppingContext,
    ShoppingContextProvider
}