import { NewAddress } from "../../../types";
import { User } from "../../models";

export const create = async (userId: string, address: NewAddress) => {
    try {
        const user = await User.findOne({uuid: userId}).exec();
        if (!user){
            return new Error('Usuário não encontrado')
        } 

        const alreadyInAddress = user.address.find(ads => ads.cep === address.cep)
        if(alreadyInAddress){
            return new Error('Já existe endereço com esse CEP: ' + address.cep)
        }

        const newAddress: NewAddress[] = [
            ...user.address,
            address
        ]

        const addressUpdated = await User.findOneAndUpdate({ uuid: userId }, { address: newAddress }).exec()
        return addressUpdated?.address
    } catch (error) {
        return new Error('Erro ao consultar o registro')
    }
}