import { IAddress, IErrorAPI } from "../../../types"
import { MyApi } from "../../config"

export const create = async (newAddress: IAddress): Promise<IAddress[] | Error> => {
    try {
        const { data } = await MyApi.post('/address/new', newAddress)
        return data.address as IAddress[]
    } catch (err) {
        const erro = err as IErrorAPI
        return new Error(erro.response.data.errors.default)
    }
}