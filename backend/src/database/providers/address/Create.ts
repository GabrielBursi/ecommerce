import { NewAddress } from "../../../types";
import { Address, UserAddress } from "../../models";


export const createAddress = async (userId: string, address: NewAddress) => {
    try {
        const newAddress = new Address({...address})

        const userAddress = await UserAddress.findOne({ userId }).exec()
        if (userAddress) {
            userAddress.address.push(address)
            await userAddress.save()
        } else {
            const newUserAddress = new UserAddress({
                userId: userId,
                address: [address]
            })
            await newUserAddress.save()
        }

        await newAddress.save()

        return { newAddress }
        
    } catch (error) {
        console.log(error);
        return new Error('Erro ao consultar o registro');
    }
}