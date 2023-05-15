import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup'

import '../../shared/services/TraducoesYup'
import { validation } from "../../shared/middleware";
import { IDepartment } from "../../types";
import { DepartmentsProviders } from "../../database/providers";


const bodySchemaValidation: yup.ObjectSchema<Omit<IDepartment, 'uuid'>> = yup.object({
    name: yup.string().required(),
    to: yup.string().required(),
    img: yup.string().required(),
})

export const createDepartmentValidation = validation({
    body: bodySchemaValidation
})

export const Create = async (req: Request<{}, {}, Omit<IDepartment, 'uuid'>>, res: Response) => {

    const department = await DepartmentsProviders.createDepartment(req.body)

    if (department instanceof Error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: department.message
            }
        });

    return res.status(StatusCodes.OK).json({ department })
}