import { RequestHandler } from "express"

const CreateUser: RequestHandler = (req, res) => {
    res.json('all products')
}

const LoginUser: RequestHandler = (req, res) => {
    res.json('all products')
}

const CreateNewAddress: RequestHandler = (req, res) => {
    res.json('all products')
}

const SelectAddress: RequestHandler = (req, res) => {
    res.json('all products')
}

export const ControllerUsers = {
    CreateUser,
    LoginUser,
    CreateNewAddress,
    SelectAddress
}