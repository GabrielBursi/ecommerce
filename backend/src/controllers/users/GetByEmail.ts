import { Request, Response } from "express"
import * as yup from 'yup';
import { StatusCodes } from "http-status-codes";
import { validation } from "../../shared/middleware"
import { NewUser } from "../../types";
import '../../shared/services/TraducoesYup'
import { UsersProviders } from "../../database/providers";
import { JWTService } from "../../shared/services";

export interface AccessToken {
    accessToken: string;
}

const paramsSchemaValidation: yup.ObjectSchema<Pick<NewUser,"email">> = yup.object({
    email: yup.string().email().required(),
})

const bodySchemaValidation: yup.ObjectSchema<AccessToken> = yup.object({
    accessToken: yup.string().required(),
})

export const getUserValidation = validation({
    params: paramsSchemaValidation,
    body: bodySchemaValidation
})

export const getUser = async (req: Request<Pick<NewUser, "email">, {}, AccessToken>, res: Response) => {
    const email = req.params.email
    const token = req.body.accessToken

    const user = await UsersProviders.getByEmail(email)

    if (user instanceof Error)
        return res.status(StatusCodes.UNAUTHORIZED).json({
            errors: {
                default: 'Email ou senha incorretos.'
            }
        });

    if (typeof user === 'string')
        return res.status(StatusCodes.UNAUTHORIZED).json({
            errors: {
                default: user
            }
        });

    const accessToken = JWTService.verify(token);
    if (accessToken === 'JWT_NOT_FOUND')
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: 'Erro ao gerar token de acesso',
            },
        });
    if (accessToken === 'INVALID_TOKEN')
        return res.status(StatusCodes.UNAUTHORIZED).json({
            errors: {
                default: 'Token não é válido.',
            },
        })

    return res.status(StatusCodes.OK).json({ user })
}