import { IErrorAPI, IProducts } from "../../../types"
import { MyApi } from "../../config"

export const getAll = async (): Promise<IProducts[] | Error> => {
    try {
        const { data } = await MyApi('/products')
        return data as IProducts[]
    } catch (err) {
        const erro = err as IErrorAPI
        return new Error(erro.response.data.errors.default)
    }
}