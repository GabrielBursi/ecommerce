import * as createUser from './CreateUser'
import * as loginUser from './LoginUser'
import * as getUser from './GetByEmail'

export const UsersController = {
    ...createUser,
    ...loginUser,
    ...getUser
}