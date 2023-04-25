import { IErrorAPI, IProducts } from "../../../types"
import { MyApi } from "../../config"

export const excludeProductInCart = async (productId: string): Promise<IProducts[] | Error> => {
    try {
        const { data } = await MyApi.delete(`/cart/remove/${productId}`)
        return data.productDeleted as IProducts[]
    } catch (err) {
        const erro = err as IErrorAPI
        return new Error(erro.response.data.errors.default)
    }
}