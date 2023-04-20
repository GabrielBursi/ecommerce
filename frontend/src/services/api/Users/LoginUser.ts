import axios from "axios";
import { IErrorAPI, IUser } from "../../../types";
import { MyApi } from "../../config";

interface AccessToken {
    accessToken: string,
    user: IUser
}

export const login = async (user: Pick<IUser, 'email' | 'password'>): Promise<AccessToken | Error> => {
    try {
        const { data } = await MyApi.post<AccessToken | IErrorAPI>('/login', user)

        const userId = data as AccessToken
        axios.defaults.headers.common['x-user-id'] = userId.user.uuid

        return data as AccessToken
    } catch (err) {
        const erro = err as IErrorAPI
        return new Error(erro.response.data.errors.default)
    }
}