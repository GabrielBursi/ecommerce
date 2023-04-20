import { IErrorAPI } from "../../../types"
import { MyApi } from "../../config"

export const clear = async (): Promise<[] | Error> => {
    try {
        const { data } = await MyApi.delete('/cart/clear')
        return data as []
    } catch (err) {
        const erro = err as IErrorAPI
        return new Error(erro.response.data.errors.default)
    }
}