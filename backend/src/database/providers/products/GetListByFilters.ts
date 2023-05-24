import { Category, IFilterProducts } from "../../../types"
import { categories } from "../../../utils";
import { Products } from "../../models"

export const getListByFilters = async (typeOfSearch: Category, filter: IFilterProducts) => {
    try {

        const isCategory = categories.includes(typeOfSearch)

        if(isCategory){
            const queryForCategory = {
                category: typeOfSearch,
                price: { 
                    $gte: filter.price.min, 
                    $lte: filter.price.max 
                }
            };

            const [products, totalCount] = await Promise.all([
                Products.find(queryForCategory).skip(filter.skip).limit(filter.limit).exec(),
                Products.countDocuments(queryForCategory),
            ]);

            return { products, totalCount };
        }


        const queryForName = {
            name: {
                $regex: typeOfSearch, 
                $options: 'i'
            },
            price: {
                $gte: filter.price.min,
                $lte: filter.price.max
            }
        };

        const [products, totalCount] = await Promise.all([
            Products.find(queryForName).skip(filter.skip).limit(filter.limit).exec(),
            Products.countDocuments(queryForName),
        ]);

        return { products, totalCount };
    } catch (error) {
        return new Error('Erro ao consultar registro: ' + error)
    }
}