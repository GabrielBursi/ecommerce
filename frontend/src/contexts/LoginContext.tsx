import { createContext, useState } from "react";
import { ChildrenProp, IUser, IUserShopData } from "../types";

interface LoginContextData{
    loginInfo?: Omit<IUser, 'uuid'>,
    setFormLoginInfo: (value: Omit<IUser, 'uuid'> | undefined) => void,

    isLogged: boolean,
    setIsLogged: React.Dispatch<React.SetStateAction<boolean>>,

    logOut: (setUserShop: (v: IUserShopData | null) => void) => void,
}

const LoginContext = createContext({} as LoginContextData)

function LoginContextProvider({children}:ChildrenProp) {

    const [loginInfo, setFormLoginInfo] = useState<Omit<IUser, 'uuid'>>();
    const [isLogged, setIsLogged] = useState<boolean>(false);

    function logOut(setUserShop: (v: IUserShopData | null) => void) {
        setUserShop(null)
        setFormLoginInfo(undefined)
        localStorage.removeItem('accessToken');
        localStorage.removeItem('email');
        setIsLogged(false);
    }
    
    return (
        <LoginContext.Provider value={{ 
            loginInfo, 
            setFormLoginInfo,
            isLogged,
            setIsLogged,
            logOut,
        }}>
            {children}
        </LoginContext.Provider>
    );
}

export {
    LoginContext,
    LoginContextProvider
}