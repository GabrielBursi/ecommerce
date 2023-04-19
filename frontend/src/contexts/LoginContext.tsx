import { createContext, useState } from "react";
import { ChildrenProp, IUser } from "../types";

interface LoginContextData{
    formLogin?: Omit<IUser, 'uuid'>,
    setFormLogin: (value: Omit<IUser, 'uuid'>) => void,

    isLogged: boolean,
    setIsLogged: React.Dispatch<React.SetStateAction<boolean>>,

    logOut: () => void
}

const LoginContext = createContext({} as LoginContextData)

function LoginContextProvider({children}:ChildrenProp) {

    const [formLogin, setFormLogin] = useState<Omit<IUser, 'uuid'>>();

    const [isLogged, setIsLogged] = useState<boolean>(false);

    function logOut(){
        setFormLogin(undefined)
        localStorage.removeItem('userIsLogged');
        setIsLogged(false);
    }

    return (
        <LoginContext.Provider value={{ 
            formLogin, 
            setFormLogin,
            isLogged,
            setIsLogged,
            logOut
        }}>
            {children}
        </LoginContext.Provider>
    );
}

export {
    LoginContext,
    LoginContextProvider
}