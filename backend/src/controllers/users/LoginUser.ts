import { Request, Response } from "express"
import * as yup from 'yup';
import { StatusCodes } from "http-status-codes";
import { validation } from "../../shared/middleware"
import { NewUser } from "../../types";
import '../../shared/services/TraducoesYup'
import { UsersProviders } from "../../database/providers";
import { JWTService, PasswordCrypto } from "../../shared/services";

const bodySchemaValidation: yup.ObjectSchema<Omit<NewUser, 'name' | 'confirmPassword' | 'cpf' | 'uuid'>> = yup.object({
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
})

export const loginUserValidation = validation({
    body: bodySchemaValidation,
})

export const LoginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body

    const user = await UsersProviders.getByEmail(email)

    if (user instanceof Error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: 'Email ou senha incorretos.'
            }
        });

    const compareHashPassword = await PasswordCrypto.verifyPassword(password, user.password)
    if (!compareHashPassword)
        return res.status(StatusCodes.UNAUTHORIZED).json({
            errors: {
                default: `Email ou senha incorretos.`
            }
        });

    const accessToken = JWTService.signIn({ uid: user.id });
    if (accessToken === 'JWT_SECRET_NOT_FOUND')
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: 'Erro ao gerar token de acesso',
            },
        });

    return res.status(StatusCodes.OK).json({ accessToken })
}