import * as getAll from './GetAll'
import * as getById from './GetById'
import * as addInCart from './AddCart'
import * as addInFavorites from './AddFavorite'
import * as createMyOrder from './Purchase'
import * as create from './Create'
import * as clear from './ClearCart'
import * as excludeCart from './ExcludeProductCart'
import * as excludeFavorite from './ExcludeProductFavorite'
import * as alterQuant from './AlterQuantProd'
import * as getByCategory from './GetByCategory'

export const ProductsProviders = {
    ...getAll,
    ...getById,
    ...addInCart,
    ...addInFavorites,
    ...createMyOrder,
    ...create,
    ...clear,
    ...excludeCart,
    ...excludeFavorite,
    ...alterQuant,
    ...getByCategory
}