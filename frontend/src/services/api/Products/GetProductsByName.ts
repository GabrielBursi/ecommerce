import { IErrorAPI, IProductsCategory } from "../../../types"
import { MyApi } from "../../config"

export const getByName = async (name: string): Promise<IProductsCategory | Error> => {
    try {
        const { data } = await MyApi(`/product?name=${name}`)
        return data as IProductsCategory
    } catch (err) {
        const erro = err as IErrorAPI
        return new Error(erro.response.data.errors.default)
    }
}