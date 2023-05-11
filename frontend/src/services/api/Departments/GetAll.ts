import { IDepartment, IErrorAPI } from "../../../types"
import { MyApi } from "../../config"

export const getAll = async (): Promise<IDepartment[] | Error> => {
    try {
        const { data } = await MyApi('/departments')
        return data.departments as IDepartment[]
    } catch (err) {
        const erro = err as IErrorAPI
        return new Error(erro.response.data.errors.default)
    }
}