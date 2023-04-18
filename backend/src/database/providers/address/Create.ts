import { NewAddress } from "../../../types";
import { User } from "../../models";

export const create = async (userId: string | string[], address: NewAddress) => {
    try {
        const user = await User.findOne({uuid: userId}).exec();
        if (!user){
            return new Error('Usuário não encontrado')
        } 

        user.address?.address.push(address)
        await user.save()

        return { newAddress: address }
    } catch (error) {
        console.log(error)
        return new Error('Erro ao consultar o registro')
    }
}