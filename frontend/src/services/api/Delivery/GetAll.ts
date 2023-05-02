import { IDelivery, IErrorAPI } from "../../../types"
import { MyApi } from "../../config"

export const getAll = async (): Promise<IDelivery[] | Error> => {
    try {
        const { data } = await MyApi('/delivery')
        return data.deliveryOptionSelected as IDelivery[]
    } catch (err) {
        const erro = err as IErrorAPI
        return new Error(erro.response.data.errors.default)
    }
}