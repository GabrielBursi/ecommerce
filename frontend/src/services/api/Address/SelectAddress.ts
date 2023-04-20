import { IAddress, IErrorAPI } from "../../../types";
import { MyApi } from "../../config";

export const select = async (cep: string): Promise<IAddress[] | Error> => {
    try {
        const { data } = await MyApi.patch('/address/select', {cep})
        return data as IAddress[]
    } catch (err) {
        const erro = err as IErrorAPI
        return new Error(erro.response.data.errors.default)
    }
}