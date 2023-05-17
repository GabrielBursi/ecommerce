import { IErrorAPI, IProductsCategory } from "../../../types"
import { MyApi } from "../../config"

type limit = 20 | 40 | 60 | 80 | 100

export const getProductsByCategory = async (category: string, page: number, limit: limit, min: number, max: number): Promise<IProductsCategory | Error> => {
    try {
        const { data } = await MyApi(`/products/${category}?page=${page}&exibir=${limit}&min=${min}&max=${max}`)
        return data as IProductsCategory
    } catch (err) {
        const erro = err as IErrorAPI
        return new Error(erro.response.data.errors.default)
    }
}