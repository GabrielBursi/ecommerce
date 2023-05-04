"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerUser = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
exports.routerUser = (0, express_1.Router)();
exports.routerUser.post('/create', controllers_1.UsersController.createUserValidation, controllers_1.UsersController.CreateUser);
exports.routerUser.post('/login', controllers_1.UsersController.loginUserValidation, controllers_1.UsersController.LoginUser);
exports.routerUser.post('/user/:email', controllers_1.UsersController.getUserValidation, controllers_1.UsersController.getUser);
