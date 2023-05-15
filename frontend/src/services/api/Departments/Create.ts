import { IDepartment, IErrorAPI } from "../../../types"
import { MyApi } from "../../config"

export const create = async (departments: Omit<IDepartment, 'uuid'>[]): Promise<IDepartment[] | Error> => {
    try {
        const { data } = await MyApi.post('/departments', departments)
        return data.newDepartments as IDepartment[]
    } catch (err) {
        const erro = err as IErrorAPI
        return new Error(erro.response.data.errors.default)
    }
}