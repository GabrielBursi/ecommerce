import { IErrorAPI, IProducts } from "../../../types"
import { MyApi } from "../../config"

export const getProductsHome = async (): Promise<IProducts[] | Error> => {
    try {
        const { data } = await MyApi('/products')
        return data.products as IProducts[]
    } catch (err) {
        const erro = err as IErrorAPI
        return new Error(erro.response.data.errors.default)
    }
}