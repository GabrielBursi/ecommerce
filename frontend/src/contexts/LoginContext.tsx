import { createContext, useState } from "react";
import { ChildrenProp } from "../types";

interface LoginContextData{
    name: string,
    email: string,
    password: string,
    confirmPassword: string,
    setName: React.Dispatch<React.SetStateAction<string>>,
    setEmail: React.Dispatch<React.SetStateAction<string>>,
    setPassword: React.Dispatch<React.SetStateAction<string>>,
    setConfirmPassword: React.Dispatch<React.SetStateAction<string>>,

    errorName: string,
    errorEmail: string,
    errorPassword: string,
    errorConfirmPassword: string,
    setErrorName: React.Dispatch<React.SetStateAction<string>>,
    setErrorEmail: React.Dispatch<React.SetStateAction<string>>,
    setErrorPassword: React.Dispatch<React.SetStateAction<string>>,
    setErrorConfirmPassword: React.Dispatch<React.SetStateAction<string>>,

    isLogged: boolean,
}

const LoginContext = createContext({} as LoginContextData)

function LoginContextProvider({children}:ChildrenProp) {

    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');

    const [errorName, setErrorName] = useState<string>('');
    const [errorEmail, setErrorEmail] = useState<string>('');
    const [errorPassword, setErrorPassword] = useState<string>('');
    const [errorConfirmPassword, setErrorConfirmPassword] = useState<string>('');

    const isLogged = true

    return (
        <LoginContext.Provider value={{ 
            name, 
            setName, 
            email, 
            setEmail, 
            password, 
            setPassword, 
            confirmPassword, 
            setConfirmPassword, 
            errorName, 
            errorEmail, 
            errorPassword, 
            errorConfirmPassword, 
            setErrorName, 
            setErrorEmail, 
            setErrorPassword, 
            setErrorConfirmPassword,
            isLogged
        }}>
            {children}
        </LoginContext.Provider>
    );
}

export {
    LoginContext,
    LoginContextProvider
}