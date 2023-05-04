"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerAddress = void 0;
const express_1 = require("express");
const middleware_1 = require("../shared/middleware");
const controllers_1 = require("../controllers");
exports.routerAddress = (0, express_1.Router)();
exports.routerAddress.use(middleware_1.ensureAuthenticated, middleware_1.searchId);
exports.routerAddress.post('/address/new', controllers_1.AddressController.createAddressValidation, controllers_1.AddressController.CreateNewAddress); //* PRIVATE
exports.routerAddress.patch('/address/select', controllers_1.AddressController.selectAddressValidation, controllers_1.AddressController.SelectAddress); //* PRIVATE
exports.routerAddress.patch('/address/edit/:cep', controllers_1.AddressController.editAddressValidation, controllers_1.AddressController.EditAddress); //* PRIVATE
