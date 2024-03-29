import { IErrorAPI, IProducts } from "../../../types"
import { MyApi } from "../../config"

export const addInFavorites = async (productId: string): Promise<IProducts[] | Error> => {
    try {
        const { data } = await MyApi.post(`/favorites/add/${productId}`)
        return data.favorites as IProducts[]
    } catch (err) {
        const erro = err as IErrorAPI
        return new Error(erro.response.data.errors.default)
    }
}