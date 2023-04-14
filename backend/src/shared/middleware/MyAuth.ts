import { RequestHandler } from "express"
import { StatusCodes } from "http-status-codes"

export const myAuth: RequestHandler = (req, res, next) => {

    const { authorization } = req.headers

    if (!authorization) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ errors: { default: 'Não autorizado.' } })
    }

    const [type, token] = authorization.split(' ')

    if (type !== 'Bearer') {
        return res.status(StatusCodes.UNAUTHORIZED).json({ errors: { default: 'Não autorizado.' } })
    }

    if (token !== process.env.JWT_SECRET) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ errors: { default: 'Não autorizado.' } })
    }

    return next()
}