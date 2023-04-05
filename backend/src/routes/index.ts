import express from "express";
import { ControllerProducts, ControllerUsers } from "../controllers";

export const router = express.Router();


//!USERS

router.post('/create', ControllerUsers.createUserValidation, ControllerUsers.CreateUser)
router.post('/login', ControllerUsers.LoginUser)

router.post('/address/new', ControllerUsers.CreateNewAddress)
router.get('/address/select', ControllerUsers.SelectAddress)

//!PRODUCTS

router.get('/products', ControllerProducts.GetAllProducts)
router.get('/products/:id', ControllerProducts.GetProductById)