import { IErrorAPI, IProducts } from "../../../types"
import { MyApi } from "../../config"

export const getById = async (productId: string): Promise<IProducts | Error> => {
    try {
        const { data } = await MyApi(`/product/${productId}`)
        return data.product as IProducts
    } catch (err) {
        const erro = err as IErrorAPI
        return new Error(erro.response.data.errors.default)
    }
}