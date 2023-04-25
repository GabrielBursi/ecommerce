import { IErrorAPI, IProducts } from "../../../types"
import { MyApi } from "../../config"

type action = '+' | '-'

export const alterQuant = async (productId: string, action: action ): Promise<IProducts[] | Error> => {
    try {
        const { data } = await MyApi.patch(`/cart/quant/${productId}`, {action})
        return data.productAltered as IProducts[]
    } catch (err) {
        const erro = err as IErrorAPI
        return new Error(erro.response.data.errors.default)
    }
}