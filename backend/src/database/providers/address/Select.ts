import { NewAddress } from "../../../types";
import { User } from "../../models"

export const select = async (userId: string, cep: string) => {
    try {
        const user = await User.findOne({ uuid: userId }).exec()

        if (!user) {
            return new Error('Usuário não existe');
        }

        const selectedAddress = user.address.find(address => address.cep === cep);

        if(!selectedAddress){
            return new Error('Usuário não possui esse CEP cadastrado: ' + cep);
        }

        const newArrayAddress: NewAddress[] = user.address.map(ads => {
            if (ads.cep !== cep) {
                return { ...ads, isSelected: false }
            }
            return {...selectedAddress, isSelected: true}
        })

        const addressUpdated = await User.findOneAndUpdate({ uuid: userId }, { address: newArrayAddress }, { new: true }).exec()
        return addressUpdated?.address
    } catch (error) {
        return new Error('Erro ao consultar o endereço');
    }
}