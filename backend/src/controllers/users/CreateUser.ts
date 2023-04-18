import { Request, Response } from "express"
import * as yup from 'yup';
import { StatusCodes } from "http-status-codes";

import { validation } from "../../shared/middleware"
import { UsersProviders } from "../../database/providers";
import { NewUser } from "../../types"
import { JWTService } from "../../shared/services";
import '../../shared/services/TraducoesYup'

const bodySchemaValidation: yup.ObjectSchema<Omit<NewUser , 'uuid'>> = yup.object({
    name: yup.string().min(2).required(),
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
    confirmPassword: yup.string().oneOf([yup.ref('password')]).required(),
    cpf: yup.string().required().matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/),
})

export const createUserValidation = validation({
    body: bodySchemaValidation,
})

export const CreateUser = async (req: Request<{}, {}, NewUser>, res: Response) => {
    const user = await UsersProviders.create(req.body)

    if (user instanceof Error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: user.message
            }
        });

    if (typeof user === 'string')
        return res.status(StatusCodes.CONFLICT).json({
            errors: {
                default: user
            }
        });
    
    const accessToken = JWTService.signIn({ uid: user.uuid });
    if (accessToken === 'JWT_SECRET_NOT_FOUND')
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: 'Erro ao gerar token de acesso',
            },
        });

    res.header("x-user-id", user.uuid);

    return res.status(StatusCodes.OK).json({ accessToken })
}