import express from "express";
import { AddressController, ProductsController, UsersController } from "../controllers";
import { ensureAuthenticated } from "../shared/middleware";

export const router = express.Router();

//!USERS
router.post('/create', UsersController.createUserValidation, UsersController.CreateUser)
router.post('/login', UsersController.LoginUser)

//!ADDRESS
router.post('/address/new', ensureAuthenticated, AddressController.CreateNewAddress)
router.get('/address/select', ensureAuthenticated, AddressController.SelectAddress)

//!PRODUCTS
router.get('/products', ProductsController.GetAllProducts)
router.get('/products/:id', ProductsController.GetProductById)