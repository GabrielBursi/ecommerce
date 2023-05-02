import { ICartAPI, IErrorAPI } from "../../../types"
import { MyApi } from "../../config"

type action = '+' | '-'

export const alterQuant = async (productId: string, action: action ): Promise<ICartAPI | Error> => {
    try {
        const { data } = await MyApi.patch(`/cart/quant/${productId}`, {action})
        return data.productAltered as ICartAPI
    } catch (err) {
        const erro = err as IErrorAPI
        return new Error(erro.response.data.errors.default)
    }
}