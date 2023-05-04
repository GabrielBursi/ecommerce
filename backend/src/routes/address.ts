import { Router } from "express"
import { ensureAuthenticated, searchId } from "../shared/middleware"
import { AddressController } from "../controllers"

export const routerAddress = Router()

routerAddress.use(ensureAuthenticated, searchId)
routerAddress.post('/address/new', AddressController.createAddressValidation, AddressController.CreateNewAddress) //* PRIVATE
routerAddress.patch('/address/select', AddressController.selectAddressValidation, AddressController.SelectAddress) //* PRIVATE
routerAddress.patch('/address/edit/:cep', AddressController.editAddressValidation, AddressController.EditAddress) //* PRIVATE