import { Request, Response } from "express"
import { StatusCodes } from "http-status-codes";
import { DepartmentsProviders } from "../../database/providers";
import '../../shared/services/TraducoesYup'

export const GetAll = async (req: Request, res: Response) => {
    const departments = await DepartmentsProviders.getAll()

    if (departments instanceof Error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: departments.message
            }
        });

    return res.status(StatusCodes.OK).json({ departments })
}