import { Request, Response } from "express"
import * as yup from 'yup';
import { validation } from "../../shared/middleware"
import { NewUser } from "../../types";
import '../../shared/services/TraducoesYup'

const bodySchemaValidation: yup.ObjectSchema<Omit<NewUser, 'name' | 'confirmPassword' | 'cpf'>> = yup.object({
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
})

export const loginUserValidation = validation({
    body: bodySchemaValidation,
})

export const LoginUser = (req: Request, res: Response) => {
    res.json('all products')
}