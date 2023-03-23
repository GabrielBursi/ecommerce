import { useContext } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import { Form } from "../components";
import { LoginContext } from "../contexts";
import { LayoutBase } from "../layouts";

import '../TraducoesYup'
import * as yup from 'yup'
import { YupSchemaLogin } from "../types";

export function Login() {

    const { create } = useParams<'create'>();

    const { setFormLogin } = useContext(LoginContext)

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


    function onSubmit(data: YupSchemaLogin) {

        //! melhorar código
        if (create) {
            createLoginSchema.validate(data, {abortEarly: false})
                .then(valid => {
                    setFormLogin(valid)
                })
                .catch((errors: yup.ValidationError) => {
                    console.log(errors);
                    
                })
            return
        }

        loginSchema.validate(data, { abortEarly: false })
            .then(valid => { console.log('passou', valid) })
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