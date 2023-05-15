import { v4 as uuidv4 } from 'uuid';
import { IDepartment } from "../../../types"
import { Departments } from "../../models"

export const createDepartment = async (departments: Omit<IDepartment, 'uuid'>[]): Promise<IDepartment[] | Error> => {
    try {

        const newDepartments = departments.map(department => {
            const newDepartment = new Departments({
                ...department,
                uuid: uuidv4()
            })

            return newDepartment
        })

        const savedDepartments = await Promise.all(newDepartments.map(department => department.save()))
        return [...savedDepartments]

    } catch (error) {
        return new Error('Erro ao criar registro: ' + error)
    }
}