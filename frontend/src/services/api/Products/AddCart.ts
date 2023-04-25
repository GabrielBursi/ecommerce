import { IErrorAPI, IProducts } from "../../../types"
import { MyApi } from "../../config"

export const addInCart = async (productId: string): Promise<IProducts[] | Error> => {
    try {
        const { data } = await MyApi.post(`/cart/add/${productId}`)
        return data.products as IProducts[]
    } catch (err) {
        const erro = err as IErrorAPI
        return new Error(erro.response.data.errors.default)
    }
}