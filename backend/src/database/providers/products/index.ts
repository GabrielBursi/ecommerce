import { getByName } from './GetByName';
import * as getHome from './GetHome'
import * as getById from './GetById'
import * as addInCart from './AddCart'
import * as addInFavorites from './AddFavorite'
import * as createMyOrder from './Purchase'
import * as create from './Create'
import * as clear from './ClearCart'
import * as excludeCart from './ExcludeProductCart'
import * as excludeFavorite from './ExcludeProductFavorite'
import * as alterQuant from './AlterQuantProd'
import { getListByFilters } from './GetListByFilters'
import * as deleteCategory from './DeleteCategory'

export const ProductsProviders = {
    ...getHome,
    ...getById,
    ...addInCart,
    ...addInFavorites,
    ...createMyOrder,
    ...create,
    ...clear,
    ...excludeCart,
    ...excludeFavorite,
    ...alterQuant,
    getListByFilters,
    ...deleteCategory,
    getByName
}