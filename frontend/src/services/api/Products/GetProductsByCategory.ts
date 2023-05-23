import { Category, IErrorAPI, IProductsCategory, LimitProductsPerPage } from "../../../types"
import { MyApi } from "../../config"

export const getProductsByCategory = async (category: Category, page: number, limit: LimitProductsPerPage, min: number, max: number): Promise<IProductsCategory | Error> => {
    try {
        const { data } = await MyApi(`/products/${category}?page=${page}&limit=${limit}&min=${min}&max=${max}`)
        return data as IProductsCategory
    } catch (err) {
        const erro = err as IErrorAPI
        return new Error(erro.response.data.errors.default)
    }
}