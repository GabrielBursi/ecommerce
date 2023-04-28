import { IErrorAPI, IMyOrders } from "../../../types"
import { MyApi } from "../../config"

export const purchase = async (order: IMyOrders): Promise<IMyOrders[] | Error> => {
    try {
        const { data } = await MyApi.post('/cart/done', {...order})
        return data.myOrders as IMyOrders[]
    } catch (err) {
        const erro = err as IErrorAPI
        return new Error(erro.response.data.errors.default)
    }
}