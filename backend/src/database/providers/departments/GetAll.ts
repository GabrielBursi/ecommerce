import { Departments } from "../../models"

export const getAll = async () => {
    try {
        const departments = await Departments.find().exec()
        return departments
    } catch (error) {
        return new Error('Erro ao consultar registro: ' + error)
    }
}