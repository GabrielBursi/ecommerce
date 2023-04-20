import { IErrorAPI, IProducts } from "../../../types"
import { MyApi } from "../../config"

export const alterQuant = async (productId: string): Promise<IProducts[] | Error> => {
    try {
        const { data } = await MyApi.patch(`/cart/quant/${productId}`)
        return data as IProducts[]
    } catch (err) {
        const erro = err as IErrorAPI
        return new Error(erro.response.data.errors.default)
    }
}