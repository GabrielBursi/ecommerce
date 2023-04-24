import { IErrorAPI, IUser } from "../../../types";
import { MyApi } from "../../config";

interface AccessToken {
    accessToken: string,
    user: IUser
}

export const getByEmail = async (email: string, accessToken: string): Promise<AccessToken | Error> => {
    try {
        const { data, headers } = await MyApi.post<AccessToken | IErrorAPI>(`/user/${email}`, {accessToken})

        const userId = headers['x-user-id'];

        MyApi.defaults.headers.common['x-user-id'] = userId;

        return data as AccessToken
    } catch (err) {
        const erro = err as IErrorAPI
        return new Error(erro.response.data.errors.default)
    }
}