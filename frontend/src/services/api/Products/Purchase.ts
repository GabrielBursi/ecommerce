import { IErrorAPI, IMyOrders } from "../../../types"
import { MyApi } from "../../config"

export const purchase = async (): Promise<IMyOrders[] | Error> => {
    try {
        const { data } = await MyApi.post('/cart/done')
        return data as IMyOrders[]
    } catch (err) {
        const erro = err as IErrorAPI
        return new Error(erro.response.data.errors.default)
    }
}