import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup'

import '../../shared/services/TraducoesYup'
import { validation } from "../../shared/middleware";
import { IDepartment } from "../../types";
import { DepartmentsProviders } from "../../database/providers";

type Body = {
    departments: Omit<IDepartment, 'uuid'>[]
}

const bodySchemaValidation: yup.ObjectSchema<Body> = yup.object({
    departments: yup.array().required()
})

export const createDepartmentValidation = validation({
    body: bodySchemaValidation
})

export const Create = async (req: Request<{}, {}, Body>, res: Response) => {

    const { departments } = req.body

    const newDepartments = await DepartmentsProviders.createDepartment(departments)

    if (newDepartments instanceof Error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: newDepartments.message
            }
        });

    return res.status(StatusCodes.OK).json({ newDepartments })
}