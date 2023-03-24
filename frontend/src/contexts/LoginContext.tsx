import { createContext, useState } from "react";
import { ChildrenProp } from "../types";
import { YupSchemaLogin } from "../types/login";

interface LoginContextData{
    formLogin?: YupSchemaLogin,
    setFormLogin: (value: YupSchemaLogin) => void,

    isLogged: boolean,
    setIsLogged: React.Dispatch<React.SetStateAction<boolean>>
}

const LoginContext = createContext({} as LoginContextData)

function LoginContextProvider({children}:ChildrenProp) {

    const [formLogin, setFormLogin] = useState<YupSchemaLogin>();

    const [isLogged, setIsLogged] = useState<boolean>(true);

    return (
        <LoginContext.Provider value={{ 
            formLogin, 
            setFormLogin,
            isLogged,
            setIsLogged
        }}>
            {children}
        </LoginContext.Provider>
    );
}

export {
    LoginContext,
    LoginContextProvider
}