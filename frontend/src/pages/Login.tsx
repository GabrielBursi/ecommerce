import { useContext } from "react";
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


    //!temporário
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

        //! melhorar código
        if (create)  {
            createLoginSchema.validate(data, {abortEarly: false})
                .then( async (valid) => {
                    const data = await createUser(valid)
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

        loginSchema.validate(data, { abortEarly: false })
            .then( async (valid) => { 
                const data = await login(valid)

                if(data === 'Esse usuario nao existe.'){
                    return toast.error(data,{position: 'top-center'});
                    
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
                />
            </Box>
        </LayoutBase>
    );
}