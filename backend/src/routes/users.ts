import { Router } from "express"
import { UsersController } from "../controllers"

export const routerUser = Router()

routerUser.post('/create', UsersController.createUserValidation, UsersController.CreateUser)
routerUser.post('/login', UsersController.loginUserValidation, UsersController.LoginUser)
routerUser.post('/user/:email', UsersController.getUserValidation, UsersController.getUser)