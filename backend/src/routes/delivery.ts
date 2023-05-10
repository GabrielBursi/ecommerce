import { Router } from "express"
import { ensureAuthenticated, searchId } from "../shared/middleware"
import { DeliveryController } from "../controllers"

export const routerDelivery = Router()

routerDelivery.get('/delivery', ensureAuthenticated, searchId, DeliveryController.GetAllDeliveryOptions)
routerDelivery.patch('/delivery/select', ensureAuthenticated, searchId, DeliveryController.selectDeliveryValidation, DeliveryController.SelectDeliveryOption)