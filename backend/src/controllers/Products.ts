import { RequestHandler } from "express"

const GetAllProducts: RequestHandler = (req, res) => {
    res.json('all products')
}

const GetProductById: RequestHandler = (req, res) => {
    res.json('product id')
}

export const ControllerProducts = {
    GetAllProducts,
    GetProductById
}