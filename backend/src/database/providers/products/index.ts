import * as getAll from './GetAll'
import * as getById from './GetById'
import * as addInCart from './AddCart'
import * as addInFavorites from './AddFavorite'
import * as createMyOrder from './Purchase'

export const ProductsProviders = {
    ...getAll,
    ...getById,
    ...addInCart,
    ...addInFavorites,
    ...createMyOrder
}