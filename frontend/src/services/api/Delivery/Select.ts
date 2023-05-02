import { IDelivery, IErrorAPI } from "../../../types";
import { MyApi } from "../../config";

export const select = async (name: string): Promise<IDelivery[] | Error> => {
    try {
        const { data } = await MyApi.patch('/delivery/select', { name })
        return data.deliveryOptionSelected as IDelivery[]
    } catch (err) {
        const erro = err as IErrorAPI
        return new Error(erro.response.data.errors.default)
    }
}