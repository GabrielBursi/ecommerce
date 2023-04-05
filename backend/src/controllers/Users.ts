import { Request, Response } from 'express';
import * as yup from 'yup';
import { NewUser } from "../types"
import { validation } from "../shared/middleware";

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

const CreateUser = (req: Request<{}, {}, NewUser>, res: Response) => {
    res.json(req.body)
}

const LoginUser = (req: Request, res: Response) => {
    res.json('all products')
}

const CreateNewAddress = (req: Request, res: Response) => {
    res.json('all products')
}

const SelectAddress = (req: Request, res: Response) => {
    res.json('all products')
}

export const ControllerUsers = {
    CreateUser,
    LoginUser,
    CreateNewAddress,
    SelectAddress,

    createUserValidation,
}