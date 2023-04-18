import * as getAllProducts from './GetAllProducts'
import * as getProductById from './GetProductById'
import * as addCart from './AddCart'
import * as addFavorite from './AddFavorites'
import * as purchase from './Purchase'
import * as addProductInDb from './AddProducts'
import * as clearCart from './ClearCart'
import * as excludeProductCart from './ExcludeProductInCart'
import * as excludeProductFavorite from './ExcludeProductInFavorite'
import * as quantProduct from './QuantProduct'

export const ProductsController = {
    ...getAllProducts,
    ...getProductById,
    ...addFavorite,
    ...addCart,
    ...purchase,
    ...addProductInDb,
    ...clearCart,
    ...excludeProductCart,
    ...excludeProductFavorite,
    ...quantProduct,
}