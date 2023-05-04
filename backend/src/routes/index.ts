import express from "express";
import { routerUser } from "./users";
import { routerAddress } from "./address";
import { routerProducts } from "./products";
import { routerDelivery } from "./delivery";

export const router = express.Router({mergeParams: true});

router.get('/', (_, res) => {res.send('Hello World!')})
router.use('/', routerUser)
router.use('/', routerAddress)
router.use('/', routerProducts)
router.use('/', routerDelivery)