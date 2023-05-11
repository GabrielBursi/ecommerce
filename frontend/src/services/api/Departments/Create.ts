import { IDepartment, IErrorAPI } from "../../../types"
import { MyApi } from "../../config"

export const create = async (department: Omit<IDepartment, 'uuid'>): Promise<IDepartment | Error> => {
    try {
        const { data } = await MyApi.post('/departments', department)
        return data.department as IDepartment
    } catch (err) {
        const erro = err as IErrorAPI
        return new Error(erro.response.data.errors.default)
    }
}