import * as getAllProducts from './GetAllProducts'
import * as getProductById from './GetProductById'

export const ProductsController = {
    ...getAllProducts,
    ...getProductById,
}