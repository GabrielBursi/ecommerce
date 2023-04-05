import * as createUser from './CreateUser'
import * as loginUser from './LoginUser'

export const UsersController = {
    ...createUser,
    ...loginUser,
}