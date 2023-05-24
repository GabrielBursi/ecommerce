import { Router } from 'express'
import { ProductsController } from '../controllers'
import { ensureAuthenticated, fetchProducts, formatProductPrice, formatProducts, myAuth, searchId } from '../shared/middleware'

export const routerProducts = Router()

routerProducts.get('/products/:category', ProductsController.filterProductValidation, ProductsController.GetFilteredProductsList)
routerProducts.get('/products', ProductsController.GetHomeProducts)
routerProducts.get('/product/:id', ProductsController.getByIdValidation, ProductsController.GetProductById)
routerProducts.get('/product', ProductsController.getByNameValidation, ProductsController.GetProductByName)
routerProducts.post('/favorites/add/:id', ensureAuthenticated, searchId, ProductsController.addProductInFavoriteValidation, ProductsController.AddFavorite) //* PRIVATE
routerProducts.post('/cart/add/:id', ensureAuthenticated, searchId, ProductsController.addProductInCartValidation, ProductsController.AddCart) //* PRIVATE
routerProducts.patch('/cart/quant/:id', ensureAuthenticated, searchId, ProductsController.alterQuantProductCartValidation, ProductsController.AlterQuantProduct) //* PRIVATE
routerProducts.post('/cart/done', ensureAuthenticated, searchId, ProductsController.createMyOrderValidation, ProductsController.Purchase) //* PRIVATE
routerProducts.delete('/cart/clear', ensureAuthenticated, searchId, ProductsController.ClearCart) //* PRIVATE
routerProducts.delete('/cart/remove/:id', ensureAuthenticated, searchId, ProductsController.excludeProductCartValidation, ProductsController.ExcludeProductCart) //* PRIVATE
routerProducts.delete('/favorite/remove/:id', ensureAuthenticated, searchId, ProductsController.excludeProductFavoriteValidation, ProductsController.ExcludeProductFavorite) //* PRIVATE
routerProducts.delete('/products/:category', myAuth, ProductsController.deleteCategoryValidation, ProductsController.DeleteCategory) //* PRIVATE

routerProducts.post('/products', myAuth, ProductsController.createProductValidation, fetchProducts, formatProducts, formatProductPrice, ProductsController.AddProduct) //* PRIVATE