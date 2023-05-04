"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerProducts = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
const middleware_1 = require("../shared/middleware");
exports.routerProducts = (0, express_1.Router)();
exports.routerProducts.get('/products/:category', controllers_1.ProductsController.filterProductValidation, controllers_1.ProductsController.GetProductsByCategory);
exports.routerProducts.get('/products', controllers_1.ProductsController.GetAllProducts);
exports.routerProducts.get('/product/:id', controllers_1.ProductsController.getByIdValidation, controllers_1.ProductsController.GetProductById);
exports.routerProducts.post('/favorites/add/:id', middleware_1.ensureAuthenticated, middleware_1.searchId, controllers_1.ProductsController.addProductInFavoriteValidation, controllers_1.ProductsController.AddFavorite); //* PRIVATE
exports.routerProducts.post('/cart/add/:id', middleware_1.ensureAuthenticated, middleware_1.searchId, controllers_1.ProductsController.addProductInCartValidation, controllers_1.ProductsController.AddCart); //* PRIVATE
exports.routerProducts.patch('/cart/quant/:id', middleware_1.ensureAuthenticated, middleware_1.searchId, controllers_1.ProductsController.alterQuantProductCartValidation, controllers_1.ProductsController.AlterQuantProduct); //* PRIVATE
exports.routerProducts.post('/cart/done', middleware_1.ensureAuthenticated, middleware_1.searchId, controllers_1.ProductsController.createMyOrderValidation, controllers_1.ProductsController.Purchase); //* PRIVATE
exports.routerProducts.delete('/cart/clear', middleware_1.ensureAuthenticated, middleware_1.searchId, controllers_1.ProductsController.ClearCart); //* PRIVATE
exports.routerProducts.delete('/cart/remove/:id', middleware_1.ensureAuthenticated, middleware_1.searchId, controllers_1.ProductsController.excludeProductCartValidation, controllers_1.ProductsController.ExcludeProductCart); //* PRIVATE
exports.routerProducts.delete('/favorite/remove/:id', middleware_1.ensureAuthenticated, middleware_1.searchId, controllers_1.ProductsController.excludeProductFavoriteValidation, controllers_1.ProductsController.ExcludeProductFavorite); //* PRIVATE
exports.routerProducts.post('/products', middleware_1.myAuth, controllers_1.ProductsController.createProductValidation, middleware_1.fetchProducts, middleware_1.formatProducts, middleware_1.formatProductPrice, controllers_1.ProductsController.AddProduct); //* PRIVATE
