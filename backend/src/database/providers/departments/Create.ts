import { v4 as uuidv4 } from 'uuid';
import { IDepartment } from "../../../types"
import { Departments } from "../../models"

export const createDepartment = async (department: Omit<IDepartment, 'uuid'>): Promise<IDepartment | Error> => {
    try {

        const newDepartment = new Departments({
            ...department,
            uuid: uuidv4()
        })
        await newDepartment.save()
        return  newDepartment

    } catch (error) {
        return new Error('Erro ao criar registro: ' + error)
    }
}