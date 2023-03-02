import { useContext } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import { Form } from "../components";
import { LoginContext } from "../contexts";
import { LayoutBase } from "../layouts";

import '../TraducoesYup'
import * as yup from 'yup'

interface YupSchemaLogin {
    name: string,
    email: string,
    password: string,
    confirmPassword: string,
}

export function Login() {

    const { create } = useParams<'create'>();

    const { 
            name, 
            email, 
            password, 
            confirmPassword, 
            setErrorName, 
            setErrorEmail, 
            setErrorPassword, 
            setErrorConfirmPassword 
        } = useContext(LoginContext)

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
    })

    function handleSubmit() {

        const userDataCreate = { name, email, password, confirmPassword }
        const userDataLogin = { email, password }

        //! melhorar código
        if (create) {
            createLoginSchema.validate(userDataCreate, {abortEarly: false})
                .then(valid => {console.log('passou')})
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
                        }
                    });
                })
            return
        }

        loginSchema.validate(userDataLogin, { abortEarly: false })
            .then(valid => { console.log('passou') })
            .catch((errors: yup.ValidationError) => {
                errors.inner.forEach(error => {
                    switch (error.path) {
                        case 'email':
                            setErrorEmail(error.message);
                            break
                        case 'password':
                            setErrorPassword(error.message);
                            break
                    }
                });
            })
    }

    return (
        <LayoutBase showUserInfo showTabBar = {false}>
            <Box display='flex' justifyContent='center' alignItems='center' height='100%'>
                <Form nameForm={create ? "CRIAR CONTA" : "FAZER LOGIN"} textButton={create ? "criar" : "entrar"} create={create  ? true : false} handleSubmit={handleSubmit}/>
            </Box>
        </LayoutBase>
    );
}