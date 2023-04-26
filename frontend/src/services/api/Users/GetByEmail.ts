import { IErrorAPI, IUserDataAPI } from "../../../types";
import { MyApi } from "../../config";

export const getByEmail = async (email: string, accessToken: string): Promise<IUserDataAPI | Error> => {
    try {
        const { data, headers } = await MyApi.post<IUserDataAPI | IErrorAPI>(`/user/${email}`, {accessToken})

        const userId = headers['x-user-id'];

        MyApi.defaults.headers.common['x-user-id'] = userId;

        return data as IUserDataAPI
    } catch (err) {
        const erro = err as IErrorAPI
        return new Error(erro.response.data.errors.default)
    }
}