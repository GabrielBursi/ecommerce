import express from "express";
import { AddressController, ProductsController, UsersController } from "../controllers";

export const router = express.Router();

//!USERS
router.post('/create', UsersController.createUserValidation, UsersController.CreateUser)
router.post('/login', UsersController.LoginUser)

//!ADDRESS
router.post('/address/new', AddressController.CreateNewAddress)
router.get('/address/select', AddressController.SelectAddress)

//!PRODUCTS
router.get('/products', ProductsController.GetAllProducts)
router.get('/products/:id', ProductsController.GetProductById)