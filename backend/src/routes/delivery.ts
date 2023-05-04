import { Router } from "express"
import { ensureAuthenticated, searchId } from "../shared/middleware"
import { DeliveryController } from "../controllers"

export const routerDelivery = Router()

routerDelivery.use(ensureAuthenticated, searchId)
routerDelivery.get('/delivery', DeliveryController.GetAllDeliveryOptions)
routerDelivery.patch('/delivery/select', DeliveryController.selectDeliveryValidation, DeliveryController.SelectDeliveryOption)