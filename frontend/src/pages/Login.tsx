import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Box } from "@mui/material";
import { toast } from "react-toastify";
import * as yup from 'yup'
import '../TraducoesYup'

import { Form } from "../components";
import { LoginContext } from "../contexts";
import { LayoutBase } from "../layouts";
import { IUser } from "../types";
import { ServicesUsers } from "../services/api";

export function Login() {

    const { create } = useParams<'create'>();
    const navigate = useNavigate()

    const { setFormLoginInfo, setIsLogged } = useContext(LoginContext)

    const [isLoading, setIsLoading] = useState(false);

    const loginSchema: yup.ObjectSchema<Pick<IUser, 'email' | 'password'>> = yup.object({
        email: yup.string().email().required(),
        password: yup.string().min(6).required(),
    })

    const createLoginSchema: yup.ObjectSchema<Omit<IUser, 'uuid'>> = yup.object({
        name: yup.string().min(2).required(),
        email: yup.string().email().required(),
        password: yup.string().min(6).required(),
        confirmPassword: yup.string().oneOf([yup.ref('password')]).required(),
        cpf: yup.string().required().matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/),
    })


    function onSubmit(data: IUser) {

        if (create)  {

            setIsLoading(true)

            createLoginSchema.validate(data, {abortEarly: false})
                .then( async (valid) => {
                    const data = await ServicesUsers.create(valid)

                    setIsLoading(false)

                    if(data instanceof Error){
                        return toast.error(data.message, {position: 'top-center'})
                    }

                    localStorage.setItem('accessToken', JSON.stringify(data.accessToken))
                    localStorage.setItem('email', JSON.stringify(data.user.email))
                    toast.success(`Seja Bem-Vindo(a), ${data.user.name}`, { position: 'top-center' });
                    
                    setFormLoginInfo(valid)
                    setIsLogged(true)
                    navigate('/')
                })
            return
        }

        setIsLoading(true)

        loginSchema.validate(data, { abortEarly: false })
            .then( async (valid) => { 
                const data = await ServicesUsers.login(valid)

                setIsLoading(false)

                if (data instanceof Error) {
                    return toast.error(data.message, { position: 'top-center' })
                }

                localStorage.setItem('accessToken', JSON.stringify(data.accessToken))
                localStorage.setItem('email', JSON.stringify(data.user.email))
                toast.success(`Seja Bem-Vindo(a), ${data.user.name}`, { position: 'top-center' });

                setFormLoginInfo(data.user)
                setIsLogged(true)
                navigate('/')
            })
    }

    return (
        <LayoutBase showUserInfo>
            <Box display='flex' justifyContent='center' alignItems='center' height='100%'>
                <Form 
                    nameForm={create ? "CRIAR CONTA" : "FAZER LOGIN"} 
                    textButton={create ? "criar" : "entrar"} 
                    create={!!create} 
                    onSubmit={onSubmit}
                    schemaCreate={createLoginSchema}
                    schemaLogin={loginSchema}
                    isLoading={isLoading}
                />
            </Box>
        </LayoutBase>
    );
}