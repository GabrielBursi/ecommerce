import * as create from './CreateUser'
import * as login from './LoginUser'

export const ServicesUsers = {
    ...create,
    ...login
}