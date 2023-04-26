import { IErrorAPI, IUser, IUserDataAPI } from "../../../types"
import { MyApi } from "../../config"

export const create = async (newUser: Omit<IUser, 'uuid'>): Promise<IUserDataAPI | Error> => {
    try {
        const { data, headers } = await MyApi.post<IUserDataAPI | IErrorAPI>('/create', newUser)

        const userId = headers['x-user-id'];

        MyApi.defaults.headers.common['x-user-id'] = userId;

        return data as IUserDataAPI
    } catch (err) {
        const erro = err as IErrorAPI
        return new Error(erro.response.data.errors.default)
    }
}