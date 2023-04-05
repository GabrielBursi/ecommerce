import { Request, Response } from "express"

export const GetProductById = (req: Request, res: Response) => {
    res.json('product id')
}