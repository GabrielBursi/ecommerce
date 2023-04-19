import * as getAll from './GetAllProducts'
import * as getById from './GetProductById'
import * as addCart from './AddCart'
import * as addFavorite from './AddFavorites'
import * as purchase from './Purchase'
import * as addProductInDb from './AddProducts'
import * as clear from './ClearCart'
import * as excludeInCart from './ExcludeProductInCart'
import * as excludeInFavorite from './ExcludeProductInFavorite'
import * as alterQuant from './QuantProduct'

export const ServicesProducts = {
    ...getAll,
    ...getById,
    ...addFavorite,
    ...addCart,
    ...purchase,
    ...addProductInDb,
    ...clear,
    ...excludeInCart,
    ...excludeInFavorite,
    ...alterQuant,
}
