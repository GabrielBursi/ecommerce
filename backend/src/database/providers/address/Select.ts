import { UserAddress } from "../../models"

export const selectAddress = async (userId: string, cep: string) => {
    try {
        const userAddress = await UserAddress.findOne({ userId }).exec()

        if (!userAddress) {
            return new Error('Usuário não existe');
        }

        const selectedAddress = userAddress.address.find(address => address.cep === cep);

        return selectedAddress || new Error('Não existe nenhum endereço cadastrado com esse CEP.'); 
    } catch (error) {
        console.log(error);
        return new Error('Erro ao consultar o endereço');
    }
}