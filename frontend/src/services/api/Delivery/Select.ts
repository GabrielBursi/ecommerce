import { IDelivery, IErrorAPI } from "../../../types";
import { MyApi } from "../../config";

interface OptionsWithTotal {
    total: number;
    options: IDelivery[]
}

export const select = async (name: string): Promise<OptionsWithTotal | Error> => {
    try {
        const { data } = await MyApi.patch('/delivery/select', { name })
        return data.deliveryOptionSelected as OptionsWithTotal
    } catch (err) {
        const erro = err as IErrorAPI
        return new Error(erro.response.data.errors.default)
    }
}