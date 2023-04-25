import { IErrorAPI, IProducts } from "../../../types"
import { MyApi } from "../../config"

export const excludeProductInFavorite = async (productId: string): Promise<IProducts[] | Error> => {
    try {
        const { data } = await MyApi.delete(`/favorite/remove/${productId}`)
        return data.productDeleted as IProducts[]
    } catch (err) {
        const erro = err as IErrorAPI
        return new Error(erro.response.data.errors.default)
    }
}