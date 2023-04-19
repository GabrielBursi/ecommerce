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

        const newAddress: NewAddress = {
            ...address, isSelected: true
        }

        user.address.push(newAddress)

        const addressSelected: NewAddress[] = user.address.map(ads => {
            if(ads.cep !== address.cep){
                return {...ads, isSelected: false}
            }
            return newAddress
        })

        const addressUpdated = await User.findOneAndUpdate({ uuid: userId }, { address: addressSelected }, {new: true}).exec()
        return addressUpdated?.address
    } catch (error) {
        return new Error('Erro ao consultar o registro')
    }
}   