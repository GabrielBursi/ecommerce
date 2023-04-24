import * as create from './CreateUser'
import * as login from './LoginUser'
import * as getByEmail from './GetByEmail'

export const ServicesUsers = {
    ...create,
    ...login,
    ...getByEmail,
}