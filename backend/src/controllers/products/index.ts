import * as getAllProducts from './GetAllProducts'
import * as getProductById from './GetProductById'
import * as addCart from './AddCart'
import * as addFavorite from './AddFavorites'
import * as purchase from './Purchase'

export const ProductsController = {
    ...getAllProducts,
    ...getProductById,
    ...addFavorite,
    ...addCart,
    ...purchase
}