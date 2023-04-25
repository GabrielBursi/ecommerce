import { createContext, useState } from "react";
import { ChildrenProp, IUser } from "../types";

interface LoginContextData{
    loginInfo?: Omit<IUser, 'uuid'>,
    setFormLoginInfo: (value: Omit<IUser, 'uuid'> | undefined) => void,

    isLogged: boolean,
    setIsLogged: React.Dispatch<React.SetStateAction<boolean>>,
}

const LoginContext = createContext({} as LoginContextData)

function LoginContextProvider({children}:ChildrenProp) {

    const [loginInfo, setFormLoginInfo] = useState<Omit<IUser, 'uuid'>>();

    const [isLogged, setIsLogged] = useState<boolean>(false);

    return (
        <LoginContext.Provider value={{ 
            loginInfo, 
            setFormLoginInfo,
            isLogged,
            setIsLogged,
        }}>
            {children}
        </LoginContext.Provider>
    );
}

export {
    LoginContext,
    LoginContextProvider
}