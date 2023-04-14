import * as getAll from './GetAll'
import * as getById from './GetById'
import * as addInCart from './AddCart'
import * as addInFavorites from './AddFavorite'
import * as createMyOrder from './Purchase'
import * as create from './Create'

export const ProductsProviders = {
    ...getAll,
    ...getById,
    ...addInCart,
    ...addInFavorites,
    ...createMyOrder,
    ...create
}