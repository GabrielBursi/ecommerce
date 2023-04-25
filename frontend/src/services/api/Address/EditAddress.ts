import { IAddress, IEditAddress, IErrorAPI } from "../../../types";
import { MyApi } from "../../config";

export const edit = async (cep: string, newAddressInfo: IEditAddress): Promise<IAddress[] | Error> => {
    try {
        const { data } = await MyApi.patch(`/address/edit/${cep}`, { newAddressInfo })
        return data.addressEdited as IAddress[]
    } catch (err) {
        const erro = err as IErrorAPI
        return new Error(erro.response.data.errors.default)
    }
}