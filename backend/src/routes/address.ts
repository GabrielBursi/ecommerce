import { Router } from "express"
import { ensureAuthenticated, searchId } from "../shared/middleware"
import { AddressController } from "../controllers"

export const routerAddress = Router()

routerAddress.post('/address/new', ensureAuthenticated, searchId, AddressController.createAddressValidation, AddressController.CreateNewAddress) //* PRIVATE
routerAddress.patch('/address/select', ensureAuthenticated, searchId, AddressController.selectAddressValidation, AddressController.SelectAddress) //* PRIVATE
routerAddress.patch('/address/edit/:cep', ensureAuthenticated, searchId, AddressController.editAddressValidation, AddressController.EditAddress) //* PRIVATE