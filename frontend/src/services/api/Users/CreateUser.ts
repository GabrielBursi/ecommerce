import axios from "axios"
import { IErrorAPI, IUser } from "../../../types"
import { MyApi } from "../../config"

interface AccessToken {
    accessToken: string,
    user: IUser
}

export const create = async (newUser: Omit<IUser, 'uuid'>): Promise<AccessToken | Error> => {
    try {
        const { data, headers } = await MyApi.post<AccessToken | IErrorAPI>('/create', newUser)

        console.log(headers)

        const userId = data as AccessToken
        axios.defaults.headers.common['x-user-id'] = userId.user.uuid

        return data as AccessToken
    } catch (err) {
        const erro = err as IErrorAPI
        return new Error(erro.response.data.errors.default)
    }
}