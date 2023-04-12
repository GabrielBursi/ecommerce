import express from "express";
import { AddressController, ProductsController, UsersController } from "../controllers";
import { ensureAuthenticated } from "../shared/middleware";

export const router = express.Router();

//!USERS
router.post('/create', UsersController.createUserValidation, UsersController.CreateUser)
router.post('/login', UsersController.loginUserValidation, UsersController.LoginUser)

//!ADDRESS
router.post('/address/new', ensureAuthenticated, AddressController.createAddressValidation, AddressController.CreateNewAddress) //* PRIVATE
router.post('/address/select', ensureAuthenticated, AddressController.selectAddressValidation, AddressController.SelectAddress) //* PRIVATE

//!PRODUCTS
router.get('/products', ProductsController.GetAllProducts)
router.get('/products/:id', ProductsController.getByIdValidation, ProductsController.GetProductById)
router.post('/favorites/add/:id', ensureAuthenticated, ProductsController.addProductInFavoriteValidation, ProductsController.AddFavorite) //* PRIVATE
router.post('/cart/add/:id', ensureAuthenticated, ProductsController.addProductInCartValidation, ProductsController.AddCart) //* PRIVATE
router.post('/cart/done', ensureAuthenticated, ProductsController.createMyOrderValidation, ProductsController.Purchase) //* PRIVATE