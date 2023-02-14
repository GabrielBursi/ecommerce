import { useContext } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import { Form } from "../components";
import { LoginContext } from "../contexts";
import { LayoutBase } from "../layouts";

import '../TraducoesYup'
import * as yup from 'yup'

interface YupSchemaLogin {
    name?: string,
    email: string,
    password: string,
    confirmPassword?: string,
}

export function Login() {

    const { create } = useParams<'create'>();

    const { name, email, password, confirmPassword, setErrorName, setErrorEmail, setErrorPassword, setErrorConfirmPassword } = useContext(LoginContext)

    const loginSchema: yup.ObjectSchema<YupSchemaLogin> = yup.object({
        name: yup.string().required().min(2),
        email: yup.string().email().required(),
        password: yup.string().required().min(6),
        confirmPassword: yup.string().oneOf([yup.ref('password')]).required(),
    })

    function handleSubmit() {

        loginSchema.validate({name, email, password, confirmPassword}, {abortEarly: false})
            .then(valid => console.log('passou'))
            .catch((errors: yup.ValidationError) => {
                errors.inner.forEach(error => {
                    switch (error.path) {
                        case 'name':
                            setErrorName(error.message);

                            break
                        case 'email':
                            setErrorEmail(error.message);

                            break
                        case 'password':
                            setErrorPassword(error.message);

                            break
                        case 'confirmPassword':
                            setErrorConfirmPassword(error.message);

                            break
                        default:
                            console.log('nenhum erro')
                            break
                    }
                });
            })

        if(create){
            console.log('criar conta');
            return
        }

        console.log('logar');
        
    }

    return (
        <LayoutBase showUserInfo showTabBar = {false}>
            <Box display='flex' justifyContent='center' alignItems='center' height='100%'>
                <Form title={create ? "CRIAR CONTA" : "FAZER LOGIN"} textButton={create ? "criar" : "entrar"} create={create  ? true : false} handleSubmit={handleSubmit}/>
            </Box>
        </LayoutBase>
    );
}