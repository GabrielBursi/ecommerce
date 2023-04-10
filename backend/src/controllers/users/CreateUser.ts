import { Request, Response } from "express"
import * as yup from 'yup';
import { validation } from "../../shared/middleware"
import { NewUser } from "../../types"
import '../../shared/services/TraducoesYup'

const bodySchemaValidation: yup.ObjectSchema<NewUser> = yup.object({
    name: yup.string().min(2).required(),
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
    confirmPassword: yup.string().oneOf([yup.ref('password')]).required(),
    cpf: yup.string().required().matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/),
})

export const createUserValidation = validation({
    body: bodySchemaValidation,
})

export const CreateUser = (req: Request<{}, {}, NewUser>, res: Response) => {
    res.json(req.body)
}