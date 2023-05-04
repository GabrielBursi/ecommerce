import { IFilterProducts } from "../../../types"
import { Products } from "../../models"

export const getByCategory = async (category: string, filter: IFilterProducts) => {
    try {

        const query = {
            category,
            price: { 
                $gte: filter.price.min, 
                $lte: filter.price.max 
            }
        };

        const [products, totalCount] = await Promise.all([
            Products.find(query)
                .skip(filter.skip)
                .limit(filter.exibir)
                .exec(),
            Products.countDocuments(query),
        ]);

        return { products, totalCount };
    } catch (error) {
        return new Error('Erro ao consultar registro: ' + error)
    }
}