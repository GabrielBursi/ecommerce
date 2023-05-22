import { Category } from "../../../types"
import { Products } from "../../models"

export const deleteCategory = async (category: Category | undefined) => {
    try {
        if (!category) {
            return 'category do produto não encontrado'
        }

        const excludeCategory = await Products.deleteMany({ category }).exec();
        return excludeCategory

    } catch (error) {
        return new Error("Erro ao consultar registros." + error)
    }

}