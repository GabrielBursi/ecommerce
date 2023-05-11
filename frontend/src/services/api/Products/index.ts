import * as getHome from './GetProductsHome'
import * as getDepartments from '../Departments/GetAll'
import * as getById from './GetProductById'
import * as addCart from './AddCart'
import * as addFavorite from './AddFavorites'
import * as purchase from './Purchase'
import * as clear from './ClearCart'
import * as excludeInCart from './ExcludeProductInCart'
import * as excludeInFavorite from './ExcludeProductInFavorite'
import * as alterQuant from './QuantProduct'

export const ServicesProducts = {
    ...getHome,
    ...getDepartments,
    ...getById,
    ...addFavorite,
    ...addCart,
    ...purchase,
    ...clear,
    ...excludeInCart,
    ...excludeInFavorite,
    ...alterQuant,
}
