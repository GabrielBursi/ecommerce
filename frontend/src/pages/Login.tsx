import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Box } from "@mui/material";
import { toast } from "react-toastify";
import * as yup from 'yup'
import '../TraducoesYup'

import { Form } from "../components";
import { LoginContext } from "../contexts";
import { LayoutBase } from "../layouts";
import { YupSchemaLogin } from "../types";
import { createUser, login } from "../services";

export function Login() {

    const { create } = useParams<'create'>();
    const navigate = useNavigate()

    const { setFormLogin, setIsLogged } = useContext(LoginContext)

    const [isLoading, setIsLoading] = useState(false);

    const loginSchema: yup.ObjectSchema<Pick<YupSchemaLogin, 'email' | 'password'>> = yup.object({
        email: yup.string().email().required(),
        password: yup.string().min(6).required(),
    })

    const createLoginSchema: yup.ObjectSchema<YupSchemaLogin> = yup.object({
        name: yup.string().min(2).required(),
        email: yup.string().email().required(),
        password: yup.string().min(6).required(),
        confirmPassword: yup.string().oneOf([yup.ref('password')]).required(),
        cpf: yup.string().required().matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/),
    })


    function onSubmit(data: YupSchemaLogin) {

        if (create)  {

            setIsLoading(true)

            createLoginSchema.validate(data, {abortEarly: false})
                .then( async (valid) => {
                    const data = await createUser(valid)

                    setIsLoading(false)

                    if(data instanceof Error){
                        return toast.error(data.message, {position: 'top-center'})
                    }

                    localStorage.setItem('idUserLogged', JSON.stringify(data.id))
                    toast.success(`Seja Bem-Vindo(a), ${data.name}`, { position: 'top-center' });
                    
                    setFormLogin(valid)
                    setIsLogged(true)
                    navigate('/')
                })
                .catch((errors: yup.ValidationError) => {
                    console.log(errors);
                    
                })
            return
        }

        setIsLoading(true)

        loginSchema.validate(data, { abortEarly: false })
            .then( async (valid) => { 
                const data = await login(valid)

                setIsLoading(false)

                if (data instanceof Error) {
                    return toast.error(data.message, { position: 'top-center' })
                }

                if(data === 'Esse usuario nao existe.'){
                    return toast.error(data, {position: 'top-center'});
                }

                localStorage.setItem('idUserLogged', JSON.stringify(data.id))
                toast.success(`Seja Bem-Vindo(a), ${data.name}`, { position: 'top-center' });

                setFormLogin(data)
                setIsLogged(true)
                navigate('/')
            })
            .catch((errors: yup.ValidationError) => {
                console.log(errors);
                
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