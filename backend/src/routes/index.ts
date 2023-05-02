import express from "express";
import { AddressController, DeliveryController, ProductsController, UsersController } from "../controllers";
import { ensureAuthenticated, fetchProducts, formatProductPrice, formatProducts, myAuth, searchId } from "../shared/middleware";

export const router = express.Router({mergeParams: true});

router.get('/', (_, res) => {res.send('Hello World!')})

//!USERS
router.post('/create', UsersController.createUserValidation, UsersController.CreateUser)
router.post('/login', UsersController.loginUserValidation, UsersController.LoginUser)
router.post('/user/:email', UsersController.getUserValidation, UsersController.getUser)

//!ADDRESS
router.post('/address/new', ensureAuthenticated, searchId, AddressController.createAddressValidation, AddressController.CreateNewAddress) //* PRIVATE
router.patch('/address/select', ensureAuthenticated, searchId, AddressController.selectAddressValidation, AddressController.SelectAddress) //* PRIVATE
router.patch('/address/edit/:cep', ensureAuthenticated, searchId, AddressController.editAddressValidation, AddressController.EditAddress) //* PRIVATE

//!PRODUCTS
router.get('/products', ProductsController.GetAllProducts)
router.get('/products/:id', ProductsController.getByIdValidation, ProductsController.GetProductById)
router.post('/favorites/add/:id', ensureAuthenticated, searchId, ProductsController.addProductInFavoriteValidation, ProductsController.AddFavorite) //* PRIVATE
router.post('/cart/add/:id', ensureAuthenticated, searchId, ProductsController.addProductInCartValidation, ProductsController.AddCart) //* PRIVATE
router.patch('/cart/quant/:id', ensureAuthenticated, searchId, ProductsController.alterQuantProductCartValidation, ProductsController.AlterQuantProduct) //* PRIVATE
router.post('/cart/done', ensureAuthenticated, searchId, ProductsController.createMyOrderValidation, ProductsController.Purchase) //* PRIVATE
router.delete('/cart/clear', ensureAuthenticated, searchId, ProductsController.ClearCart) //* PRIVATE
router.delete('/cart/remove/:id', ensureAuthenticated, searchId, ProductsController.excludeProductCartValidation, ProductsController.ExcludeProductCart) //* PRIVATE
router.delete('/favorite/remove/:id', ensureAuthenticated, searchId, ProductsController.excludeProductFavoriteValidation, ProductsController.ExcludeProductFavorite) //* PRIVATE

//!DELIVERY
router.get('/delivery', ensureAuthenticated, searchId, DeliveryController.SelectDeliveryOption)
router.patch('/delivery/select', ensureAuthenticated, searchId, DeliveryController.selectDeliveryValidation, DeliveryController.SelectDeliveryOption)

router.post('/products', myAuth, ProductsController.createProductValidation, fetchProducts, formatProducts, formatProductPrice, ProductsController.AddProduct) //* PRIVATE