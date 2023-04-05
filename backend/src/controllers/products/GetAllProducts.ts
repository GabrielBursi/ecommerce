import { Request, Response } from "express"

export const GetAllProducts = (req: Request, res: Response) => {
    res.json('all products')
}